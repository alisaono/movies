import { Movie, getGenreNames } from "@/lib/tmdb";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 16vw, 16vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {movie.title}
        </h3>

        {/* Release Year */}
        <p className="text-gray-500 text-sm mb-3 font-medium">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
        </p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1">
          {getGenreNames(movie.genre_ids).slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 font-medium"
            >
              {genre}
            </span>
          ))}
          {movie.genre_ids.length > 2 && (
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
              +{movie.genre_ids.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Hover overlay with additional info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-4 text-white w-full">
          <h4 className="font-bold text-lg mb-2">{movie.title}</h4>
          <p className="text-sm text-gray-200 line-clamp-3 mb-3">
            {movie.overview || 'No description available.'}
          </p>
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