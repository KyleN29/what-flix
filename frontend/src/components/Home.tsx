import MovieService, { type Movie } from '../services/MovieService';
import GenreService, {type Genre} from '../services/GenreService';
// import type { MovieResponse } from '../services/MovieService';
import { useQuery } from '@tanstack/react-query';
import CategorySlider from './CategorySlider';

import './variables.css';
import './Home.css';
import { useEffect } from 'react';

function Home() {
  /* Example Usage. Remove Later */
  const { data } = useQuery<Movie[]>({
    queryKey: ['getPopularMovies'],
    queryFn: () => MovieService.getPopularMovies()
  });

  const { data: genreList } = useQuery<Genre[]>({
    queryKey: ['getGenreList'],
    queryFn: () => GenreService.getGenreList()
  });

  useEffect(() => {
    console.log(genreList)
  }, [genreList])
  return (
    <>
      <div className="home">
        <CategorySlider title="Category Slider" movies={data ?? []} />
        
      </div>
    </>
  );
}

export default Home;
