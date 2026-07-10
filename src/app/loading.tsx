export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-svp-dark py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="h-5 w-40 bg-white/10 rounded-full" />
            <div className="h-12 w-full bg-white/10 rounded-lg" />
            <div className="h-12 w-3/4 bg-white/10 rounded-lg" />
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-2/3 bg-white/10 rounded" />
            <div className="flex gap-3 pt-2">
              <div className="h-12 w-44 bg-white/10 rounded-xl" />
              <div className="h-12 w-40 bg-white/10 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
      {/* Card sobreposto skeleton */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 lg:px-8 -mt-12 lg:-mt-16 mb-8 lg:mb-12">
        <div className="bg-white rounded-2xl shadow-md h-28 lg:h-24" />
      </div>
    </div>
  );
}
