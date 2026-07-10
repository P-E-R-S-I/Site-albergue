export default function Loading() {
  return (
    <div className="bg-svp-cream min-h-screen animate-pulse">
      <div className="bg-svp-dark py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 space-y-3">
          <div className="h-4 w-44 bg-white/10 rounded-full" />
          <div className="h-11 w-64 bg-white/10 rounded-lg" />
          <div className="h-4 w-full bg-white/10 rounded" />
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-5 lg:px-8 py-14 space-y-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-white border border-svp-border rounded-xl" />
        ))}
      </div>
    </div>
  );
}
