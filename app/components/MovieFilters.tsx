'use client';

import { GENRE_MAP, LANGUAGE_MAP } from "@/lib/tmdb";

interface MovieFiltersProps {
  maxDuration: number;
  setMaxDuration: (duration: number) => void;
  selectedGenres: number[];
  setSelectedGenres: (genres: number[]) => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const MovieFilters = ({
  maxDuration,
  setMaxDuration,
  selectedGenres,
  setSelectedGenres,
  selectedLanguage,
  setSelectedLanguage,
  onSearch,
  isLoading,
}: MovieFiltersProps) => {
  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres(
      selectedGenres.includes(genreId) 
        ? selectedGenres.filter(id => id !== genreId)
        : [...selectedGenres, genreId]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Filter Movies</h2>
      
      {/* Max Duration */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Max Duration: {maxDuration} minutes
        </label>
        <input
          type="range"
          min="60"
          max="240"
          step="15"
          value={maxDuration}
          onChange={(e) => setMaxDuration(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Language */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Language</label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {Object.entries(LANGUAGE_MAP).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>

      {/* Genres */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Genres</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(GENRE_MAP).map(([id, name]) => (
            <button
              key={id}
              onClick={() => handleGenreToggle(Number(id))}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                selectedGenres.includes(Number(id))
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={onSearch}
        disabled={isLoading || selectedGenres.length === 0}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Searching...' : 'Search Movies'}
      </button>
    </div>
  );
};

export default MovieFilters; 