export default function Loading() {
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-neutral-500">Loading...</p>
      </div>
    </div>
  );
}
