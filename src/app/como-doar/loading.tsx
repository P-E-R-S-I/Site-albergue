export default function Loading() {
  return (
    <div className="bg-svp-cream min-h-screen animate-pulse">
      <div className="bg-svp-dark py-20">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 space-y-3">
          <div className="h-4 w-28 bg-white/10 rounded-full" />
          <div className="h-11 w-64 bg-white/10 rounded-lg" />
          <div className="h-4 w-96 max-w-full bg-white/10 rounded" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-16 grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="h-64 bg-white border border-svp-border rounded-2xl" />
          <div className="h-40 bg-white border border-svp-border rounded-2xl" />
        </div>
        <div className="space-y-6">
          <div className="h-64 bg-white border border-svp-border rounded-2xl" />
          <div className="h-52 bg-svp-forest/20 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
