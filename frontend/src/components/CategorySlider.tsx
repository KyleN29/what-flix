import { useState } from 'react';
import type { Movie } from '../services/MovieService';
import './CategorySlider.css';
import './variables.css';

interface Props {
  title: string;
  movies: Movie[]
}


function CategorySlider(props: Props) {
  const [scroll, setScroll] = useState(0);


  // movieWidthInPx = movieWidthInRem * Px/Rem
  const gapRem = 1
  const movieWidthInPx =
    (18+gapRem) * parseFloat(getComputedStyle(document.documentElement).fontSize);

  // Width of movies div (viewport width) in movies
  const moviesDivWidth = window.innerWidth / movieWidthInPx;

  function slide(direction: number) {
    // Return if the first movie is all the way to the left
    if (scroll <= 0 && direction < 0) return;

    // If final movie is not yet reached, keep scrolling
    if (direction < 0 || scroll + direction + moviesDivWidth < props.movies.length)
      setScroll(Math.floor(scroll + direction));
    // If the final movie is cut off by the screen's width, clicking one more time will move it to the right as far as possible without going past the final movie.
    else if (scroll + direction + moviesDivWidth - 1 < props.movies.length)
      setScroll(scroll + 1 - (moviesDivWidth - Math.floor(moviesDivWidth)));
  }

  return (
    <>
      <div className="category-slider">
        <div className="title">{props.title}</div>
        <div
          className="movies"
          style={{ left: -1 * scroll * movieWidthInPx + 'px' }}
        >
          {props.movies.map((movie, index) => (
            <div className="movie" key={index}>
              <img
                src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
                alt={movie.title}
                className="movie-img h-full w-full"
              />
            </div>
          ))}

          {/* Note: This will look better once real images are used instead of < and >*/}
          <div
            className="move-left"
            style={{ left: 1 * scroll * movieWidthInPx + 'px' }}
            onClick={() => slide(-1)}
          >
            {'<\n<\n<'}
          </div>
          <div
            className="move-right"
            style={{ left: 1 * scroll * movieWidthInPx + 'px' }}
            onClick={() => slide(1)}
          >
            {'>\n>\n>'}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategorySlider;
