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

  // Measure slider height on mount
  useEffect(() => {
    if (!sliderRef.current) return;

    const sliderPx = sliderRef.current.getBoundingClientRect().height;
    const rootFont = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );

    setSliderHeightRem(sliderPx / rootFont);
  }, []);

  // Convert slider height (rem) into actual movie width in pixels
  const movieWidthInPx =
    sliderHeightRem *
    movieDivAspectRatio *
    parseFloat(getComputedStyle(document.documentElement).fontSize);

  // Determine how many movies fit onscreen at once
  const moviesDivWidth = window.innerWidth / movieWidthInPx;

  // Move slider left or right
  function slide(direction: number) {
    // Prevent scrolling past the first movie
    if (scroll <= 0 && direction < 0) return;

    const finalIndex = scroll + direction + moviesDivWidth;

    // Scroll normally when more movies remain
    if (direction < 0 || finalIndex < props.movies.length) {
      setScroll(Math.floor(scroll + direction));
    }
    // Final adjustment to align the last movie fully onscreen
    else if (scroll + direction + moviesDivWidth - 1 < props.movies.length) {
      setScroll(scroll + 1 - (moviesDivWidth - Math.floor(moviesDivWidth)));
    }
  }

  return (
    <div className="slider-container">
      <div className="category-slider">
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
