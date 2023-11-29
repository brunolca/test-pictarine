import { TMDB, getFullImagePath as getFullImagePathBase } from "tmdb-ts";

if (!process.env.TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY is not set");
}

let client: TMDB | null = null;

if (!client) {
  client = new TMDB(process.env.TMDB_API_KEY);
}

export const tmdb = client;

export interface GetFullImagePathOptions {
  imagePath: string;
  imageSize?: string;
}

export function getFullImagePath(options: GetFullImagePathOptions): string {
  return getFullImagePathBase(
    "https://image.tmdb.org/t/p/",
    options.imageSize || "original",
    options.imagePath
  );
}
