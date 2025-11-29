import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { Movie } from '../../services/MovieService';
import MovieService from '../../services/MovieService';
import MovieCard from '../../components/MovieCard';
import './SearchResults.css';

function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const page = Number(params.get('page') || 1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', query, page],
    queryFn: () => MovieService.searchMovies(query, page),
    enabled: !!query
  });

  if (!query) return <p>No search term entered.</p>;
  if (isLoading) return <p>Loading search results…</p>;
  if (error) return <p>Error loading search results.</p>;


  const movieDivAspectRatio = 3 / 4.2;
  const movieHeightRem = 16;
  const movieWidthRem = movieHeightRem * movieDivAspectRatio;

  return (
    <div className="search-results">
      <h2>Search Results for: "{query}"</h2>

      <div className="movie-grid">
        {data
          ?.filter((movie) => movie.poster_path)
          .map((movie: Movie) => (
            <div
              key={movie.id}
              className="movie-grid-item"
              style={{
                width: `${movieWidthRem}rem`,
                height: `${movieHeightRem}rem`
              }}
            >
              <MovieCard movie={movie} aspectRatio={movieDivAspectRatio} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchResults;
