// lib/tmdb.ts
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// TMDB Genre ID to Name mapping
export const GENRE_MAP: { [key: number]: string } = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

// Common language codes for movie filtering
export const LANGUAGE_MAP: { [key: string]: string } = {
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'ja': 'Japanese',
  'ko': 'Korean',
  'zh': 'Chinese',
  'hi': 'Hindi',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'ar': 'Arabic'
};

export const getGenreNames = (genreIds: number[]): string[] => {
  return genreIds.map(id => GENRE_MAP[id]).filter(Boolean);
};

type MovieGenre = {
  id?: number;
  name: string;
}

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[];
  genres?: MovieGenre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime?: number;
  homepage?: string;
};

type MoviePage = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchPopularMovies = async (
  page: number = 1,
): Promise<MoviePage> => {
  if (!API_KEY) throw new Error("Invalid API key!");
  const params = new URLSearchParams({
    page: page.toString(),
    api_key: API_KEY,
  });

  const res = await fetch(`${BASE_URL}/movie/popular?${params.toString()}`, {
    headers: {
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.text();
    console.error('TMDB error:', error);
    throw new Error(`Failed: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

export const searchMovies = async (
  language: string,
  maxMinutes: number,
  selectedGenreIds: number[],
  page: number = 1,
): Promise<MoviePage> => {
  if (!API_KEY) throw new Error("Invalid API key!");
  const params = new URLSearchParams({
    with_runtime_lte: maxMinutes.toString(),
    with_genres: selectedGenreIds.join('|'),
    language: language,
    include_adult: 'false',
    include_video: 'false',
    vote_average_gte: '6',
    vote_count_gte: '1000',
    sort_by: 'vote_average.desc',
    page: '1',
    api_key: API_KEY,
  });

  const res = await fetch(`${BASE_URL}/discover/movie?${params.toString()}`, {
    headers: {
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.text();
    console.error('TMDB error:', error);
    throw new Error(`Failed: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
