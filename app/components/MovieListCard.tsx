

import { Movie, getGenreNames } from "@/lib/tmdb";
import MovieCard from "./MovieCard";

interface MovieListCardProps {
  movies: Movie[];
}

const MovieListCard = ({ movies }: MovieListCardProps) => {
  // Calculate total runtime
  const totalRuntime = movies.reduce((total, movie) => {
    return total + (movie.runtime || 0);
  }, 0);

  // Format runtime from minutes to hours and minutes
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
      return `${remainingMinutes}m`;
    } else if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}m`;
    }
  };

  return (
    <div className="group bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-800">
      {/* Header with movie count and total runtime */}
      <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-b border-blue-700/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="tw-mx-2 text-white font-semibold text-lg">
              Watchlist
            </h3>
          </div>
          <div className="flex items-center gap-2 text-blue-300">
            <span className="text-sm font-medium">Total Runtime:</span>
            <div className="bg-blue-900/70 px-3 py-1 rounded-full border border-blue-700/70 backdrop-blur-sm">
              <span className="text-white font-semibold">{formatRuntime(totalRuntime)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Movie cards container */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="relative"
            >
              {/* Movie number badge */}
              <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-white">
                {index + 1}
              </div>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieListCard;

