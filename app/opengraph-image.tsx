import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chips = ["Websites", "CRM", "Mobile apps", "SaaS", "AI automation"];

export default async function Image() {
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/NeverMind-Regular.ttf")),
    readFile(join(process.cwd(), "app/fonts/NeverMind-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070707",
          padding: "64px 72px",
          fontFamily: "NeverMind",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "rgba(255,77,31,0.20)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#ff4d1f",
              color: "#ffffff",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            JP
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 20,
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 700, color: "#ffffff" }}>
              {site.name}
            </div>
            <div
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.5)",
                marginTop: 4,
              }}
            >
              jptechnologies.co
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            Websites, CRMs, apps and AI automation
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.55)",
              marginTop: 22,
            }}
          >
            Built by one senior product team · Noida, India
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {chips.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "12px 22px",
                marginRight: 12,
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.16)",
                color: "rgba(255,255,255,0.72)",
                fontSize: 20,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "NeverMind", data: regular, weight: 400, style: "normal" },
        { name: "NeverMind", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}
