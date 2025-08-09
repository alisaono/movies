import { searchMovies } from '@/lib/tmdb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { language, minMinutes, maxMinutes, selectedGenreIds, page = 1 } = body;
    const response = await searchMovies(minMinutes, maxMinutes, language, selectedGenreIds, page);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 