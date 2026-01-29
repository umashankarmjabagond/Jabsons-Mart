const CategoryCardSkeleton = () => {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl
        h-[200px]
        bg-slate-800
        animate-pulse
      "
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/60" />

      <div className="relative z-10 h-full p-4 flex flex-col">
        {/* title */}
        <div className="h-4 w-32 bg-white/20 rounded mb-4" />

        <div className="flex gap-3 flex-1">
          {/* left image skeleton */}
          <div className="w-[50%] bg-white/10 rounded-xl" />

          {/* right pills */}
          <div className="flex flex-wrap gap-2 content-start">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-6 w-16 bg-white/20 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
