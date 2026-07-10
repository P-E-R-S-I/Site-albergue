export default function Loading() {
  return (
    <div className="bg-svp-cream min-h-screen animate-pulse">
      <div className="bg-svp-dark py-20">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 space-y-3">
          <div className="h-4 w-40 bg-white/10 rounded-full" />
          <div className="h-11 w-72 bg-white/10 rounded-lg" />
          <div className="h-4 w-full max-w-xl bg-white/10 rounded" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-svp-linen rounded-2xl" />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="h-80 bg-white border border-svp-border rounded-2xl" />
          <div className="h-80 bg-white border border-svp-border rounded-2xl" />
        </div>
        <div className="h-64 bg-white border border-svp-border rounded-2xl" />
      </div>
    </div>
  );
}
