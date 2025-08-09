import { searchMovies } from "@/lib/tmdb";
import MovieFeed from "./components/MovieFeed";

export default async function Home() {
  // Define duration ranges: short (60-100 min), medium (100-140 min), long (140-200 min)
  const [shortMovies, mediumMovies, longMovies] = await Promise.all([
    searchMovies(60, 100, 'en', [28, 12, 878], 1), // Action, Adventure, Sci-Fi for short films
    searchMovies(100, 140, 'en', [18, 80, 53], 1), // Drama, Crime, Thriller for medium films  
    searchMovies(140, 200, 'en', [12, 14, 28], 1), // Adventure, Fantasy, Action for long films
  ]);

  const trendingMovieLists = [
    {
      title: "Great for Quick Journeys (60-100 min)",
      movies: shortMovies.results
    },
    {
      title: "Just Right for Mid-Length Flights (100-140 min)", 
      movies: mediumMovies.results
    },
    {
      title: "Perfect for Long-Haul Journeys (140-200 min)",
      movies: longMovies.results
    }
  ];

  return (
    <div className="font-sans">
      <MovieFeed trendingMovieLists={trendingMovieLists} />
    </div>
  );
}
