import { getFullImagePath, tmdb } from "@/lib/tmdb-client";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "tmdb-ts";
import { SearchForm } from "./search-form";

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  let movies: Array<Movie>;

  if (searchParams.q) {
    movies = (await tmdb.search.movies({ query: searchParams.q })).results;
  } else {
    movies = (await tmdb.movies.popular()).results;
  }

  // const results =
  // console.log({ results });

  return (
    <main className="m-8">
      <SearchForm />
      <div className="grid grid-cols-5 gap-8">
        {movies.map((movie) => (
          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className="group flex flex-col justify-between rounded-xl bg-neutral-800 hover:bg-neutral-900"
          >
            <div
              key={movie.id}
              className="relative aspect-[9/16] transition-opacity group-hover:opacity-75"
            >
              {movie.poster_path && (
                <Image
                  src={getFullImagePath({ imagePath: movie.poster_path })}
                  alt={movie.title}
                  fill={true}
                  className="rounded-t-xl object-cover"
                ></Image>
              )}

              <div className="absolute -bottom-6 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-700">
                <span className="font-extrabold text-neutral-100">
                  {(movie.vote_average * 10).toFixed(0)}
                </span>
              </div>
            </div>
            <div className="p-2">
              <h3 className="mb-2 mt-6 text-xl font-bold text-neutral-100 group-hover:text-neutral-300">
                {movie.title}
              </h3>
              <p className="text-right text-neutral-200 group-hover:text-neutral-300">
                {new Date(movie.release_date).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
