export const blogTones: Record<string, string> = {
  orange: "from-[#ff4d1f]/35 via-[#2a130c] to-[#101010]",
  blue: "from-[#2f6fed]/35 via-[#0f1a2e] to-[#101010]",
  violet: "from-[#8b5cf6]/35 via-[#1a122c] to-[#101010]",
  green: "from-[#0f9d76]/35 via-[#0c2019] to-[#101010]",
  amber: "from-[#f08a24]/35 via-[#241708] to-[#101010]",
  slate: "from-[#64748b]/35 via-[#141a22] to-[#101010]",
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
