import MovieService from '../services/MovieService';
import { useQuery } from '@tanstack/react-query'


function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['getPopularMovies'],
    queryFn: () => MovieService.getPopularMovies(),
  })
  return (
    <>
      <p style={{ height: '200vh' }}>Hello World!</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        console.log(data)
      )}
    </>
  );
}

export default Home;
