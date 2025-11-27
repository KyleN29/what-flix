import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { Movie } from '../../services/MovieService';
import MovieService from '../../services/MovieService';

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

  return (
    <div>
      <h2>Search Results for: "{query}"</h2>

      <div className="movie-grid">
        {data?.map((movie: Movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
