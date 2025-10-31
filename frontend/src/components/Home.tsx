import MovieService, { type MovieResponse } from '../services/MovieService';
// import type { MovieResponse } from '../services/MovieService';
import { useQuery } from '@tanstack/react-query'


function Home() {
  {/*Example Usage. Remove Later */}
  const { data, isLoading } = useQuery<MovieResponse>({
    queryKey: ['getPopularMovies'],
    queryFn: () => MovieService.getPopularMovies(),
  })

  return (
    <>
      <p style={{ height: '200vh' }}>Hello World!</p>

      {/*Example Usage. Remove Later */}
      {isLoading ? (
        <p style={{ height: '200vh' }}>Loading...</p>
      ) : (
        <p style={{ height: '200vh' }}>Data: {data?.total_pages}</p>

      )}
    </>
  );
}

export default Home;
