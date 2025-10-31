import MovieService, { type MovieResponse } from '../services/MovieService';
// import type { MovieResponse } from '../services/MovieService';
import { useQuery } from '@tanstack/react-query'


function Home() {
  const { data, isLoading } = useQuery<MovieResponse>({
    queryKey: ['getPopularMovies'],
    queryFn: () => MovieService.getPopularMovies(),
  })
  return (
    <>
      <p style={{ height: '200vh' }}>Hello World!</p>
      {isLoading ? (
        <p style={{ height: '200vh' }}>Loading...</p>
      ) : (
        <p style={{ height: '200vh' }}>Data: {data?.page}</p>

      )}
    </>
  );
}

export default Home;
