'use client';

import { GENRE_MAP, LANGUAGE_MAP } from "@/lib/tmdb";

interface MovieFiltersProps {
  minDuration: number;
  setMinDuration: (duration: number) => void;
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
  minDuration,
  setMinDuration,
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
    <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6 mb-6">
      <h2 className="text-xl font-bold text-white mb-4">Filter Movies</h2>
      
      {/* Duration Range */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Duration: {minDuration} - {maxDuration} minutes
        </label>
        <div className="relative">
          <input
            type="range"
            min="60"
            max="240"
            step="10"
            value={minDuration}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value <= maxDuration) {
                setMinDuration(value);
              }
            }}
            className="absolute w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider z-10"
            style={{ background: 'transparent' }}
          />
          <input
            type="range"
            min="60"
            max="240"
            step="15"
            value={maxDuration}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= minDuration) {
                setMaxDuration(value);
              }
            }}
            className="absolute w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div 
            className="absolute h-2 bg-blue-500 rounded-lg pointer-events-none"
            style={{
              left: `${((minDuration - 60) / (240 - 60)) * 100}%`,
              width: `${((maxDuration - minDuration) / (240 - 60)) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Language */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        >
          {Object.entries(LANGUAGE_MAP).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>

      {/* Genres */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Genres</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(GENRE_MAP).map(([id, name]) => (
            <button
              key={id}
              onClick={() => handleGenreToggle(Number(id))}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                selectedGenres.includes(Number(id))
                  ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25'
                  : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-blue-400 hover:text-white'
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
        className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors font-semibold shadow-lg hover:shadow-blue-500/25"
      >
        {isLoading ? 'Searching...' : 'Search Movies'}
      </button>
    </div>
  );
};

export default MovieFilters; 