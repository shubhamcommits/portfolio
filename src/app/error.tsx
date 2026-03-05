"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
      <p className="text-neutral-400 mb-8 text-sm">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
      >
        Try again
      </button>
    </div>
  );
}
