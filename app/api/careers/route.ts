import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse, after } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { sendCareerEmail } from "@/lib/email";
import { isImageKitConfigured, uploadToImageKit } from "@/lib/imagekit";
import { site } from "@/lib/site";
import { careerSchema } from "@/lib/validation";
import { careerPositions } from "@/lib/careers";
import CareerApplication from "@/models/CareerApplication";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES = ["new", "shortlisted", "rejected"] as const;
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

function safeFileName(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
      .slice(0, 60) || "resume"
  );
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const raw = {
      fullName: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      position: String(formData.get("position") || ""),
    };

    const parsed = careerSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid application." },
        { status: 400 }
      );
    }

    if (!careerPositions.includes(parsed.data.position)) {
      return NextResponse.json(
        { error: "Choose a position from the list." },
        { status: 400 }
      );
    }

    const resume = formData.get("resume");
    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json(
        { error: "Attach your resume as a PDF." },
        { status: 400 }
      );
    }

    if (
      resume.type !== "application/pdf" &&
      !resume.name.toLowerCase().endsWith(".pdf")
    ) {
      return NextResponse.json(
        { error: "Resume must be a PDF file." },
        { status: 415 }
      );
    }

    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { error: "Resume is too large. Keep it under 5 MB." },
        { status: 413 }
      );
    }

    if (!isImageKitConfigured()) {
      return NextResponse.json(
        {
          error: `Resume uploads are temporarily unavailable. Please email your resume to ${site.email}.`,
        },
        { status: 503 }
      );
    }

    const buffer = Buffer.from(await resume.arrayBuffer());
    const filename = `${safeFileName(parsed.data.fullName)}-${Date.now()}-${randomUUID()
      .slice(0, 6)
      .replace(/-/g, "")}.pdf`;

    let resumeUrl: string;
    try {
      resumeUrl = await uploadToImageKit({
        buffer,
        fileName: filename,
        folder: "/resumes",
        mimeType: "application/pdf",
      });
    } catch (uploadError) {
      console.error("ImageKit resume upload failed:", uploadError);
      return NextResponse.json(
        {
          error: `We could not upload your resume right now. Please try again, or email it to ${site.email}.`,
        },
        { status: 503 }
      );
    }

    await connectDB();
    const application = await CareerApplication.create({
      ...parsed.data,
      resumeUrl,
      resumeName: resume.name,
      resumeProvider: "imagekit",
    });

    after(async () => {
      try {
        await sendCareerEmail({
          ...parsed.data,
          resumeUrl,
          resumeName: resume.name,
        });
      } catch (error) {
        console.error("Career email notification failed:", error);
      }
    });

    return NextResponse.json(
      { id: application._id, success: true, resumeProvider: "imagekit" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json(
      {
        error: `We could not submit your application right now. Please try again, or email ${site.email}.`,
      },
      { status: 503 }
    );
  }
}

export async function GET(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const requestedPage = Number.parseInt(searchParams.get("page") || "1", 10);
    const requestedLimit = Number.parseInt(searchParams.get("limit") || "10", 10);
    const page = Number.isFinite(requestedPage) ? Math.max(1, requestedPage) : 1;
    const limit = Number.isFinite(requestedLimit)
      ? Math.min(50, Math.max(5, requestedLimit))
      : 10;
    const status = searchParams.get("status") || "";
    const query = (searchParams.get("q") || "").trim();

    await connectDB();

    const filter: Record<string, unknown> = {};
    if (status && (STATUSES as readonly string[]).includes(status)) {
      filter.status = status;
    }

    if (query) {
      const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(safe, "i");
      filter.$or = [
        { fullName: pattern },
        { email: pattern },
        { phone: pattern },
        { position: pattern },
      ];
    }

    const total = await CareerApplication.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages);
    const skip = (currentPage - 1) * limit;

    const [applications, statusGroups] = await Promise.all([
      CareerApplication.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      CareerApplication.aggregate<{ _id: string; count: number }>([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

    const counts: Record<string, number> = {
      all: 0,
      new: 0,
      shortlisted: 0,
      rejected: 0,
    };
    for (const group of statusGroups) {
      counts[group._id] = group.count;
      counts.all += group.count;
    }

    return NextResponse.json(
      {
        applications,
        counts,
        pagination: {
          page: currentPage,
          limit,
          total,
          totalPages,
          hasPrev: currentPage > 1,
          hasNext: currentPage < totalPages,
        },
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Career GET error:", error);
    return NextResponse.json(
      { error: "Career applications are temporarily unavailable. Check the database connection." },
      { status: 503 }
    );
  }
}
