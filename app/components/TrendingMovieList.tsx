import { Movie } from "@/lib/tmdb";
import MovieCard from "./MovieCard";
import { useState, useEffect, useRef } from "react";

interface TrendingMovieListProps {
  title: string;
  movies: Movie[];
}

const TrendingMovieList = ({ title, movies }: TrendingMovieListProps) => {
  const [showScrollEducation, setShowScrollEducation] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoDismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const hasSeenScrollEducation = localStorage.getItem('hasSeenScrollEducation');
    if (!hasSeenScrollEducation && movies.length > 0) {
      setShowScrollEducation(true);
      
      // Auto-dismiss after 2 seconds
      autoDismissTimerRef.current = setTimeout(() => {
        dismissScrollEducation();
      }, 2000);
    }
  };

  const handleMouseLeave = () => {
    setShowScrollEducation(false);
    if (autoDismissTimerRef.current) {
      clearTimeout(autoDismissTimerRef.current);
      autoDismissTimerRef.current = null;
    }
  };

  const handleScroll = () => {
    if (showScrollEducation) {
      dismissScrollEducation();
    }
  };

  const dismissScrollEducation = () => {
    setShowScrollEducation(false);
    localStorage.setItem('hasSeenScrollEducation', 'true');
    if (autoDismissTimerRef.current) {
      clearTimeout(autoDismissTimerRef.current);
      autoDismissTimerRef.current = null;
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoDismissTimerRef.current) {
        clearTimeout(autoDismissTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="group relative">
      {/* Section Title */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white transition-colors duration-300 flex items-center gap-3">
          <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></span>
          {title}
        </h2>
        <div className="mt-2 h-0.5 bg-gradient-to-r from-blue-500/50 via-blue-600/30 to-transparent rounded-full"></div>
      </div>

      {/* Scrollable Movie List */}
      <div 
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide py-4 -mx-6 px-6 hover:scrollbar-custom transition-all duration-300 scroll-fade"
          onScroll={handleScroll}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-64 sm:w-72">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Scroll Education Overlay */}
        {showScrollEducation && (
          <div className="absolute inset-0 rounded-lg flex items-center justify-center z-10 animate-in fade-in duration-300 pointer-events-none">
            <div className="bg-black/70 backdrop-blur-md border border-white/20 rounded-xl p-6 mx-4 max-w-sm text-center shadow-2xl pointer-events-auto">
              <div>
                <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-blue-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 16l-4-4m0 0l4-4m-4 4h18" 
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Scroll to explore more
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingMovieList; 