import MovieService, { type Movie } from '../services/MovieService';
import GenreService, {type Genre} from '../services/GenreService';
// import type { MovieResponse } from '../services/MovieService';
import { useQuery } from '@tanstack/react-query';
import CategorySlider from './CategorySlider';
import GenreRanking from './GenreRanking';
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
        <p style={{ height: '30vh' }}>Hello World!</p>
        <CategorySlider title="Category Slider" movies={data ?? []} />
        <div className="w-[300px]">
          <GenreRanking genres={genreList ?? []}></GenreRanking>
        </div>
        
        <p style={{ height: '50vh' }}>Hello World!</p>
        <p style={{ height: '50vh' }}>Hello World!</p>
      </div>
    </>
  );
}

export default Home;
