import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import CareerApplication from "@/models/CareerApplication";

const STATUSES = ["new", "shortlisted", "rejected"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let status: unknown;
  try {
    ({ status } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof status !== "string" || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    await connectDB();
    const application = await CareerApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).lean();
    if (!application) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error("Career update error:", error);
    return NextResponse.json(
      { error: "Could not update the application. Check the database connection." },
      { status: 503 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    await connectDB();
    const result = await CareerApplication.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Career delete error:", error);
    return NextResponse.json(
      { error: "Could not delete the application. Check the database connection." },
      { status: 503 }
    );
  }
}
