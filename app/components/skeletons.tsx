// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden p-4 border rounded shadow-sm`}
    >
      <div className="flex flex-col gap-2 mb-4">
        <div className="h-6 w-32 rounded-md bg-gray-200 text-sm font-medium" />
        <div className="h-4 w-16 rounded-md bg-gray-400" />
        <div className="h-4 w-10 rounded-md bg-gray-500" />
      </div>
      <div className="h-7 w-20 rounded-md bg-gray-400" />
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
