import { useState, useEffect, useRef } from 'react';

import type { Movie } from '../services/MovieService';
import './CategorySlider.css';
import './variables.css';
import MovieCard from './MovieCard';
import type { MovieScore } from '../services/RecommendationService';

interface Props {
  title: string;
  movies: Movie[] | MovieScore[];
}

function CategorySlider(props: Props) {
  const [scroll, setScroll] = useState(0);
  const [sliderHeightRem, setSliderHeightRem] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  // Aspect ratio of each movie card container
  const movieDivAspectRatio = 2 / 3;

  // Get the slider height dynamically
  useEffect(() => {
    if (!sliderRef.current) return;

    const sliderPx = sliderRef.current.getBoundingClientRect().height;
    const rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize);

    setSliderHeightRem((sliderPx / rootFont));
  }, []);

  // Compute movie width in px based on actual slider height
  const movieWidthInPx =
    sliderHeightRem * movieDivAspectRatio *
    parseFloat(getComputedStyle(document.documentElement).fontSize);
  // Width of movies div (viewport width) in movies
  const moviesDivWidth = window.innerWidth / movieWidthInPx;

  function slide(direction: number) {
    // Return if the first movie is all the way to the left
    if (scroll <= 0 && direction < 0) return;

    // If final movie is not yet reached, keep scrolling
    if (
      direction < 0 ||
      scroll + direction + moviesDivWidth < props.movies.length
    )
      setScroll(Math.floor(scroll + direction));
    // If the final movie is cut off by the screen's width, clicking one more time will move it to the right as far as possible without going past the final movie.
    else if (scroll + direction + moviesDivWidth - 1 < props.movies.length)
      setScroll(scroll + 1 - (moviesDivWidth - Math.floor(moviesDivWidth)));
  }

  return (
    <div className="slider-container">
      <div className="category-slider" >
        <div className="title">{props.title}</div>
        <div className="move-left" onClick={() => slide(-1)}>
          {'\u276E'}
        </div>
        <div className="slider-inner" ref={sliderRef}>
          <div
          className="movies"
          style={{
            left: -1 * scroll * movieWidthInPx + 'px'
          }}
        >
          {props.movies.map((movie, i) => (
            <MovieCard
              key={i}
              movie={movie}
              aspectRatio={movieDivAspectRatio}
            />
          ))}
          
        </div>
        </div>
        <div className="move-right" onClick={() => slide(1)}>
          {'\u276F'}
        </div>
        
      </div>
    </div>
  );
}

export default CategorySlider;
