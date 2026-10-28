import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function BlogContent({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(" ").trim();
    if (text) {
      blocks.push(
        <p
          key={`p-${blocks.length}`}
          className="mt-4 text-[14px] leading-[1.85] text-white/65 sm:text-[14.5px]"
        >
          {renderInline(text)}
        </p>
      );
    }
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="mt-4 space-y-2.5">
        {list.map((item, index) => (
          <li key={index} className="flex gap-2.5">
            <span
              aria-hidden="true"
              className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
            />
            <span className="text-[13.5px] leading-[1.8] text-white/60 sm:text-[14px]">
              {renderInline(item)}
            </span>
          </li>
        ))}
      </ul>
    );
    list = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <h3
          key={`h3-${blocks.length}`}
          className="mt-7 text-[16px] font-semibold text-white sm:text-[17px]"
        >
          {trimmed.slice(4)}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <h2
          key={`h2-${blocks.length}`}
          className="mt-9 text-[20px] font-semibold tracking-[-0.01em] text-white first:mt-0 sm:text-[23px]"
        >
          {trimmed.slice(3)}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      list.push(trimmed.slice(2));
      continue;
    }

    if (list.length) flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return <div className={className}>{blocks}</div>;
}
