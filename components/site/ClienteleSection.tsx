import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Client = {
  name: string;
  /** File name inside /public/images/clients — added later without touching code. */
  file: string;
};

const clients: Client[] = [
  { name: "CollegeDunia", file: "collegedunia.png" },
  { name: "Apply MBBS", file: "apply-mbbs.png" },
  { name: "College Vidya", file: "college-vidya.png" },
  { name: "VidyaVriddhi", file: "vidyavriddhi.png" },
  { name: "Summit Global", file: "summit-global.png" },
  { name: "DM", file: "dm.png" },
  { name: "ETSA", file: "etsa.png" },
  { name: "KollegeApply", file: "kollegeapply.png" },
  { name: "K2eG", file: "k2eg.png" },
];

const LOGO_DIR = path.join(process.cwd(), "public", "images", "clients");

/** Logos are optional: drop a file in /public/images/clients and it appears. */
function logoExists(file: string) {
  try {
    return existsSync(path.join(LOGO_DIR, file));
  } catch {
    return false;
  }
}

export default function ClienteleSection() {
  return (
    <section
      id="clients"
      aria-labelledby="clients-title"
      className="shell py-10 lg:py-14"
    >
      <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.55fr)] lg:gap-14">
        {/* Left: label + statement + CTA */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
            Clientele List
          </span>
          <span
            aria-hidden="true"
            className="mt-3 block h-[2px] w-12 rounded-full bg-accent"
          />

          <h2
            id="clients-title"
            className="mt-5 text-balance text-[clamp(26px,3.2vw,40px)] font-semibold leading-[1.12] tracking-[-0.03em] text-fg"
          >
            Not just clients, they are more like{" "}
            <span className="text-accent">partners</span>
          </h2>

          <Link
            href="/#work"
            className="group mt-7 inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-[13px] font-semibold text-fg transition-colors duration-200 hover:border-accent/60 hover:bg-accent/10 hover:text-accent"
          >
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
            View Our Clients
          </Link>
        </div>

        {/* Right: dashed 3x3 logo wall */}
        <div className="overflow-hidden rounded-[22px] border border-line/80 bg-panel/40 sm:rounded-[26px]">
          <div className="-mb-px -mr-px grid grid-cols-2 sm:grid-cols-3">
            {clients.map((client) => {
              const hasLogo = logoExists(client.file);

              return (
                <div
                  key={client.name}
                  className="group relative flex h-[104px] items-center justify-center border-b border-r border-dashed border-line/60 px-4 sm:h-[120px] lg:h-[132px]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-accent/[0.05] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {hasLogo ? (
                    <span className="relative flex h-14 w-[136px] items-center justify-center rounded-xl bg-white p-2 shadow-[0_8px_20px_-14px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover:scale-[1.04] group-hover:shadow-[0_14px_28px_-14px_rgba(217,119,6,0.45)] sm:h-16 sm:w-[152px] sm:p-2.5">
                      <span className="relative h-full w-full">
                        <Image
                          src={`/images/clients/${client.file}`}
                          alt={`${client.name} logo`}
                          fill
                          sizes="152px"
                          className="object-contain"
                        />
                      </span>
                    </span>
                  ) : (
                    <span className="relative flex h-10 w-[132px] items-center justify-center gap-2 sm:h-11 sm:w-[150px]">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line/70 bg-panel-soft text-[10.5px] font-bold uppercase tracking-[0.02em] text-accent/80 transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                        {client.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                      <span className="text-[11.5px] font-semibold leading-[1.2] tracking-[-0.01em] text-fg/70 transition-colors duration-300 group-hover:text-fg sm:text-[12.5px]">
                        {client.name}
                      </span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
