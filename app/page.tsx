import { fetchPopularMovies } from "@/lib/tmdb";
import MovieFeed from "./components/MovieFeed";

export default async function Home() {
  const initialMovies = await fetchPopularMovies();
  return (
    <div className="font-sans">
      <MovieFeed initialMovies={initialMovies.results} />
    </div>
  );
}
