import { Movie } from "@/lib/tmdb";
import MovieCard from "./MovieCard";

interface TrendingMovieListProps {
  title: string;
  movies: Movie[];
}

const TrendingMovieList = ({ title, movies }: TrendingMovieListProps) => {
  return (
    <div className="group">
      {/* Section Title */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white transition-colors duration-300 flex items-center gap-3">
          <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></span>
          {title}
        </h2>
        <div className="mt-2 h-0.5 bg-gradient-to-r from-blue-500/50 via-blue-600/30 to-transparent rounded-full"></div>
      </div>

      {/* Scrollable Movie List */}
      <div className="relative">
        {/* Scrollable container */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide py-4 -mx-2 px-2 hover:scrollbar-custom transition-all duration-300">
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-64 sm:w-72">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingMovieList; 