export async function CastingSkeleton() {
  return (
    <div className="flex h-96 scroll-pl-8 space-x-4 overflow-hidden pl-8">
      {new Array(10).fill(null).map((_, key) => (
        <div
          key={key}
          className="relative aspect-[9/16] h-full snap-start snap-always rounded-2xl bg-neutral-800 transition-opacity duration-300 hover:opacity-60"
        ></div>
      ))}
    </div>
  );
}
