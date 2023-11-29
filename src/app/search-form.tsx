"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  return (
    <div>
      <form
        action="/"
        method="GET"
        onSubmit={(e) => {
          e.preventDefault();
          const searchParams = new URLSearchParams(
            new FormData(e.currentTarget) as any
          );
          router.push(`/?${searchParams.toString()}`);
        }}
      >
        <div className="mb-8 flex space-x-4">
          <input
            type="text"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-full bg-neutral-50 px-4 py-2 text-xl font-bold uppercase italic text-neutral-950"
          />

          <button
            type="submit"
            className="block rounded-full bg-neutral-50 px-4 py-2 text-xl font-bold uppercase italic text-neutral-950"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
