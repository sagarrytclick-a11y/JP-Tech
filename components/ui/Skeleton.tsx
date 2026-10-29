import { clsx } from "clsx";

/**
 * Shared loading placeholder. Use `className` for size and radius so skeletons
 * match the element they stand in for.
 */
export default function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden="true" className={clsx("skeleton", className)} />;
}
