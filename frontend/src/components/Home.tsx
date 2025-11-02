import MovieService, { type MovieResponse } from '../services/MovieService';
// import type { MovieResponse } from '../services/MovieService';
import { useQuery } from '@tanstack/react-query'
import CategorySlider from './CategorySlider';

import './variables.css';
import './Home.css';

function Home() {
  {/*Example Usage. Remove Later */}
  const { data, isLoading } = useQuery<MovieResponse>({
    queryKey: ['getPopularMovies'],
    queryFn: () => MovieService.getPopularMovies(),
  })

  return (

    <>
    <div className="home">
      <p style={{ height: '30vh' }}>Hello World!</p>
      <CategorySlider title="Category Slider" />
      <p style={{ height: '50vh' }}>Hello World!</p>
      <p style={{ height: '50vh' }}>Hello World!</p>
    </div>
      <p style={{ height: '200vh' }}>Hello World!</p>

      {/*Example Usage. Remove Later */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Data: {data?.total_pages}</p>

      )}
    

    
    </>

  );
}

export default Home;
