import { getFullImagePath } from "@/lib/tmdb-client";
import Image from "next/image";
import { Credits } from "tmdb-ts";

export interface CastingProps {
  creditsPromise: Promise<Credits>;
}

export async function Casting({ creditsPromise }: CastingProps) {
  const credits = await creditsPromise;

  return (
    <div className="flex h-96 snap-x snap-mandatory scroll-pl-8 space-x-4 overflow-auto pl-8 [&::-webkit-scrollbar]:hidden">
      {credits.cast.map((person) => (
        <div
          key={person.id}
          className="bg- relative aspect-[9/16] h-full snap-start snap-always rounded-2xl bg-neutral-800 transition-opacity duration-300 hover:opacity-60"
        >
          {person.profile_path && (
            <Image
              src={getFullImagePath({ imagePath: person.profile_path })}
              alt={person.name}
              fill={true}
              className="rounded-2xl object-cover"
            ></Image>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10"></div>
          <p className="absolute bottom-4 left-2 right-2 text-2xl font-bold text-neutral-100">
            {person.name}
          </p>
        </div>
      ))}
    </div>
  );
}
