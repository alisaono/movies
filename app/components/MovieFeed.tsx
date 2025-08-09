'use client';

import { Movie } from "@/lib/tmdb"
import { useState } from "react";
import MovieFilters from "./MovieFilters";
import MovieCard from "./MovieCard";

const MovieFeed = ({
  initialMovies,
}: {
  initialMovies: Movie[];
}) => {

  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [isLoading, setIsLoading] = useState(false);

  // Filter states
  const [minDuration, setMinDuration] = useState<number>(120);
  const [maxDuration, setMaxDuration] = useState<number>(180);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const handleSearch = async () => {
    if (selectedGenres.length === 0) {
      alert('Please select at least one genre');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/movies/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage,
          minMinutes: minDuration,
          maxMinutes: maxDuration,
          selectedGenreIds: selectedGenres,
          page: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Search failed');
      }

      const result = await response.json();
      setMovies(result.results);
    } catch (error) {
      console.error('Search failed:', error);
      alert(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Controls */}
        <div className="mb-8">
          <MovieFilters
            minDuration={minDuration}
            setMinDuration={setMinDuration}
            maxDuration={maxDuration}
            setMaxDuration={setMaxDuration}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Empty state */}
        {movies.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="text-gray-600 text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No movies found</h3>
            <p className="text-gray-400">Try adjusting your filters to find more movies.</p>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Searching for movies...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieFeed;
