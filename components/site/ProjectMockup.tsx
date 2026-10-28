const variants = {
  mg: { accent: "#2f6fed", bars: [38, 55, 42, 70, 48, 62, 35, 58] },
  car: { accent: "#6d5bd0", bars: [30, 52, 68, 45, 72, 58, 80, 64] },
  sov: { accent: "#8b5cf6", bars: [45, 38, 60, 52, 44, 66, 58, 49] },
  crm: { accent: "#e2483d", bars: [52, 44, 60, 36, 68, 48, 58, 40] },
  edu: { accent: "#0f9d76", bars: [42, 58, 50, 66, 54, 72, 48, 62] },
  app: { accent: "#f08a24", bars: [60, 46, 70, 52, 64, 42, 58, 68] },
} as const;

export type MockupVariant = keyof typeof variants;

export default function ProjectMockup({ variant }: { variant: MockupVariant }) {
  const { accent, bars } = variants[variant];

  return (
    <div className="relative h-[172px] w-full overflow-hidden bg-[#e8ecf4] p-3 sm:h-[200px]">
      <div className="flex h-full gap-2 rounded-xl bg-white p-2.5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.45)]">
        <div className="hidden w-[22%] flex-col gap-2 rounded-lg bg-[#f6f8fc] p-2 sm:flex">
          <div className="flex items-center gap-1.5">
            <span
              className="h-3.5 w-3.5 rounded"
              style={{ backgroundColor: accent }}
            />
            <span className="h-1.5 w-9 rounded bg-slate-300" />
          </div>
          <div className="mt-1 space-y-1.5">
            {[70, 55, 62, 48, 66, 40].map((width, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span
                  className="h-1.5 rounded bg-slate-200"
                  style={{ width: `${width}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-2 w-20 rounded bg-slate-300 sm:w-28" />
              <div className="h-1.5 w-14 rounded bg-slate-200" />
            </div>
            <div
              className="h-5 w-14 rounded"
              style={{ backgroundColor: accent }}
            />
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="rounded-md border border-slate-100 bg-[#fbfcfe] p-1.5"
              >
                <div className="h-1 w-6 rounded bg-slate-200" />
                <div className="mt-1 flex items-end gap-1">
                  <div className="h-2.5 w-8 rounded bg-slate-300" />
                  <div
                    className="h-1.5 w-3 rounded"
                    style={{ backgroundColor: accent }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex min-h-0 flex-1 gap-2">
            <div className="flex flex-1 items-end gap-1 rounded-md border border-slate-100 p-1.5">
              {bars.map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${height}%`,
                    backgroundColor: accent,
                    opacity: 0.35 + (index % 3) * 0.22,
                  }}
                />
              ))}
            </div>
            <div className="hidden w-[32%] space-y-1.5 rounded-md border border-slate-100 p-1.5 sm:block">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <span className="h-1 flex-1 rounded bg-slate-200" />
                  <span
                    className="h-1 w-4 rounded"
                    style={{ backgroundColor: accent, opacity: 0.5 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
