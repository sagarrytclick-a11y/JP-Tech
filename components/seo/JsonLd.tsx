/**
 * Renders a JSON-LD block. The `<` escape prevents user-authored content
 * (blog titles, excerpts, etc.) from closing the script tag early.
 */
export default function JsonLd({
  data,
  id,
}: {
  data: unknown;
  id?: string;
}) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
