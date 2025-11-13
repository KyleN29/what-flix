import MovieService, { type Movie } from '../services/MovieService';
// import type { MovieResponse } from '../services/MovieService';
import { useQuery } from '@tanstack/react-query';
import CategorySlider from './CategorySlider';

import './variables.css';
import './Home.css';

function Home() {
  /* Example Usage. Remove Later */
  const { data } = useQuery<Movie[]>({
    queryKey: ['getPopularMovies'],
    queryFn: () => MovieService.getPopularMovies()
  });

  return (
    <>
      <div className="home">
        <p style={{ height: '30vh' }}>Hello World!</p>
        <CategorySlider title="Category Slider" movies={data ?? []} />
        <p style={{ height: '50vh' }}>Hello World!</p>
        <p style={{ height: '50vh' }}>Hello World!</p>
      </div>
    </>
  );
}

export default Home;
