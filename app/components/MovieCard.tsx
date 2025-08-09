import { Movie, getGenreNames } from "@/lib/tmdb";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  // Get genre names with fallback logic
  const getMovieGenres = () => {
    if (movie.genres && movie.genres.length > 0) {
      return movie.genres.map(genre => genre.name);
    } else if (movie.genre_ids && movie.genre_ids.length > 0) {
      return getGenreNames(movie.genre_ids);
    }
    return [];
  };

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

  // Handle click to open homepage
  const handleClick = () => {
    if (movie.homepage) {
      window.open(movie.homepage, '_blank', 'noopener,noreferrer');
    }
  };

  const genreNames = getMovieGenres();
  const isClickable = Boolean(movie.homepage);

  return (
    <div
      className={`relative bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-800 ${isClickable ? 'cursor-pointer' : ''
        }`}
      onClick={handleClick}
      role={isClickable ? 'button' : undefined}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 16vw, 16vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-black/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1 border border-gray-700">
          <span className="text-yellow-400">★</span>
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 hover:opacity-0 transition-opacity duration-300">
        {/* Title */}
        <h3 className="font-bold text-white text-lg leading-tight mb-2 line-clamp-1 hover:text-blue-400 transition-colors duration-200">
          {movie.title}
        </h3>

        {/* Release Year and Runtime */}
        <div className="text-gray-400 text-sm mb-3 font-medium flex items-center gap-2">
          <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}</span>
          {movie.runtime && (
            <>
              <span>•</span>
              <span>{formatRuntime(movie.runtime)}</span>
            </>
          )}
        </div>

        {/* Genres */}
        {genreNames.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {genreNames.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="inline-block bg-gradient-to-r from-blue-900/50 to-indigo-900/50 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-700/50 font-medium backdrop-blur-sm"
              >
                {genre}
              </span>
            ))}
            {genreNames.length > 2 && (
              <span className="inline-block bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full font-medium border border-gray-700">
                +{genreNames.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover overlay with additional info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-4 text-white w-full">
          <h4 className="font-bold text-lg mb-1">{movie.title}</h4>
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
            <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}</span>
            {movie.runtime && (
              <>
                <span>•</span>
                <span>{formatRuntime(movie.runtime)}</span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-200 line-clamp-3 mb-3">
            {movie.overview || 'No description available.'}
          </p>

          {/* Genres in overlay */}
          {genreNames.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {genreNames.map((genre) => (
                <span
                  key={genre}
                  className="inline-block bg-gradient-to-r from-blue-900/70 to-indigo-900/70 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-700/70 font-medium backdrop-blur-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-semibold">{movie.vote_average.toFixed(1)}/10</span>
              <span className="text-xs text-gray-300">({movie.vote_count} votes)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 