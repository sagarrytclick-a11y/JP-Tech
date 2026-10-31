export const blogTones: Record<string, string> = {
  orange: "from-[#d97706]/30 via-[#fff7e6] to-[#ffffff]",
  blue: "from-[#2f6fed]/25 via-[#eef4ff] to-[#ffffff]",
  violet: "from-[#8b5cf6]/25 via-[#f5f0ff] to-[#ffffff]",
  green: "from-[#0f9d76]/25 via-[#edfbf6] to-[#ffffff]",
  amber: "from-[#f08a24]/30 via-[#fff7ea] to-[#ffffff]",
  slate: "from-[#64748b]/25 via-[#f1f5f9] to-[#ffffff]",
};

export function formatBlogDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
