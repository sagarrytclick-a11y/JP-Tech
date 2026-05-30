import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="text-center">
        <FaSpinner className="animate-spin text-4xl text-[#1e3a5a] mx-auto mb-4" />
        <p className="text-zinc-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}
