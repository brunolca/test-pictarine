import { Credits } from "tmdb-ts";

export interface CrewProps {
  creditsPromise: Promise<Credits>;
}

export async function Crew({ creditsPromise }: CrewProps) {
  const credits = await creditsPromise;

  return (
    <div className="my-8 grid w-full snap-mandatory scroll-pl-8 grid-cols-4 gap-8">
      {credits.crew.slice(0, 20).map((person) => (
        <div key={person.id} className="">
          <p className="font-bold text-neutral-100">{person.name}</p>
          <p className="text-sm text-neutral-200">{person.name}</p>
        </div>
      ))}
    </div>
  );
}
