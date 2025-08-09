import { Movie } from '@/lib/tmdb';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function POST(request: NextRequest) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'TMDB API key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { language, minMinutes, maxMinutes, selectedGenreIds, page = 1 } = body;

    const params = new URLSearchParams({
      with_runtime_gte: minMinutes.toString(),
      with_runtime_lte: maxMinutes.toString(),
      with_genres: selectedGenreIds.join('|'),
      with_original_language: language,
      include_adult: 'false',
      include_video: 'false',
      vote_average_gte: '6',
      vote_count_gte: '200',
      sort_by: 'popularity.desc',
      page: page.toString(),
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
      return NextResponse.json(
        { error: `TMDB API failed: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const results = data.results as Movie[];
    const newResults = await Promise.all(
      results.map(async ({ id }) => {
        const res = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}`, {
          headers: {
            accept: 'application/json',
          },
        });
        return res.json();
      })
    );
    // console.log(newResults);
    return NextResponse.json({
      ...data,
      results: newResults,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 