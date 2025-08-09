'use client';

import { useEffect } from 'react';
import { GENRE_MAP, LANGUAGE_MAP } from "@/lib/tmdb";
import { AIRPORTS } from "@/lib/airport";
import { estimateFlightTime } from "@/lib/flight";

interface MovieFiltersProps {
  minDuration: number;
  setMinDuration: (duration: number) => void;
  maxDuration: number;
  setMaxDuration: (duration: number) => void;
  selectedGenres: number[];
  setSelectedGenres: (genres: number[]) => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  originAirport: string;
  setOriginAirport: (airport: string) => void;
  destinationAirport: string;
  setDestinationAirport: (airport: string) => void;
  setIsLongFlight: (isLong: boolean) => void;
  onSearch: () => void;
  isLoading: boolean;
}

// const MIN_DURATION_MINUTES = 10;
// const MAX_DURATION_MINUTES = 240;

const MovieFilters = ({
  minDuration,
  setMinDuration,
  maxDuration,
  setMaxDuration,
  selectedGenres,
  setSelectedGenres,
  selectedLanguage,
  setSelectedLanguage,
  originAirport,
  setOriginAirport,
  destinationAirport,
  setDestinationAirport,
  setIsLongFlight,
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

  const handleFlightDurationCalculation = () => {
    if (originAirport && destinationAirport && originAirport !== destinationAirport) {
      const flightTimeMinutes = estimateFlightTime(originAirport, destinationAirport);
      if (flightTimeMinutes) {
        const isLongFlight = flightTimeMinutes > 240;
        const timePerMovie = isLongFlight ? Math.min(240, flightTimeMinutes / 2) : flightTimeMinutes;
        const bufferTime = isLongFlight ? 15 : 30;

        const recommendedMin = Math.max(30, timePerMovie - bufferTime);
        const recommendedMax = Math.max(recommendedMin + 10, timePerMovie);
        
        setIsLongFlight(isLongFlight);
        setMinDuration(recommendedMin);
        setMaxDuration(recommendedMax);
      }
    }
  };

  const getFlightTimeDisplay = () => {
    if (originAirport && destinationAirport && originAirport !== destinationAirport) {
      const flightTimeMinutes = estimateFlightTime(originAirport, destinationAirport);
      if (flightTimeMinutes) {
        const hours = Math.floor(flightTimeMinutes / 60);
        const minutes = flightTimeMinutes % 60;
        return `${hours}h ${minutes}m`;
      }
    }
    return null;
  };

  useEffect(() => {
    handleFlightDurationCalculation();
  }, [originAirport, destinationAirport]);

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6 mb-6">
      <h2 className="text-xl font-bold text-white">SkyTime Cinema</h2>
      <p className="text-gray-400 text-sm mb-4">Find movies perfectly timed for your flight and tailored to your tastes</p>

      {/* Flight Information */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">✈️ Flight Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Origin Airport */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Origin Airport</label>
            <select
              value={originAirport}
              onChange={(e) => setOriginAirport(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="">Select origin...</option>
              {Object.entries(AIRPORTS).map(([code, info]) => (
                <option
                  key={code}
                  value={code}
                  disabled={code === destinationAirport}
                >
                  {code} - {info.name}
                </option>
              ))}
            </select>
          </div>

          {/* Destination Airport */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Destination Airport</label>
            <select
              value={destinationAirport}
              onChange={(e) => setDestinationAirport(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="">Select destination...</option>
              {Object.entries(AIRPORTS).map(([code, info]) => (
                <option
                  key={code}
                  value={code}
                  disabled={code === originAirport}
                >
                  {code} - {info.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Flight Time Display and Recommendation Button */}
        {getFlightTimeDisplay() && (
          <div className="text-sm text-gray-300">
            <span className="text-white font-medium">Estimated flight time:</span> {getFlightTimeDisplay()}
          </div>
        )}
      </div>

      {/* Duration Range */}
      {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Duration (minutes)</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Min Duration</label>
            <input
              type="number"
              min={MIN_DURATION_MINUTES}
              max={MAX_DURATION_MINUTES}
              step="10"
              value={minDuration}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= MIN_DURATION_MINUTES && value <= maxDuration) {
                  setMinDuration(value);
                }
              }}
              className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Max Duration</label>
            <input
              type="number"
              min={MIN_DURATION_MINUTES}
              max={MAX_DURATION_MINUTES}
              step="10"
              value={maxDuration}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= MAX_DURATION_MINUTES && value >= minDuration) {
                  setMaxDuration(value);
                }
              }}
              className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
        </div>
      </div> */}

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
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${selectedGenres.includes(Number(id))
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
        disabled={isLoading || !originAirport || !destinationAirport || selectedGenres.length === 0}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors font-semibold shadow-lg enabled:hover:shadow-blue-500/25"
      >
        {isLoading ? 'Curating Your Recommendations…' : 'Get My Recommendations'}
      </button>
    </div>
  );
};

export default MovieFilters; 