import { getFullImagePath, tmdb } from "@/lib/tmdb-client";
import Image from "next/image";
import { Casting } from "./casting";
import { Crew } from "./crew";
import { Suspense } from "react";
import { CastingSkeleton } from "./casting-skeleton";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await tmdb.movies.details(+params.id);
  const creditsPromise = tmdb.movies.credits(+params.id);

  return (
    <main className="my-8">
      <div className="mx-16 my-8 flex space-x-8 text-white">
        {movie.poster_path && (
          <div
            key={movie.id}
            className="relative aspect-[9/16] h-[680px] flex-none"
          >
            <Image
              src={getFullImagePath({ imagePath: movie.poster_path })}
              alt={movie.title}
              fill={true}
              className="rounded-xl object-cover"
              priority={true}
            ></Image>
          </div>
        )}

        <div className="flex-1 text-neutral-50">
          <section className="mb-8">
            <h1 className="mb-2 text-7xl font-bold">{movie.title}</h1>
            <span className="italic text-neutral-200">
              {new Date(movie.release_date).toLocaleDateString()}
            </span>
            <span className="pl-4 italic text-neutral-100">
              {movie.genres.map((genre) => genre.name).join(", ")}
            </span>
          </section>
          <h3 className="mb-4 text-4xl font-bold">Synopsis</h3>
          <div className="max-w-prose">{movie.overview}</div>
          <Suspense>
            <Crew creditsPromise={creditsPromise} />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<CastingSkeleton />}>
        <Casting creditsPromise={creditsPromise} />
      </Suspense>
    </main>
  );
}
