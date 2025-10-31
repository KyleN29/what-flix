import { useState } from 'react';

import './CategorySlider.css';
import './variables.css';

interface Props {
  title: string;
}

interface Movie {
  title: string;
}

function CategorySlider(props: Props) {
  const [scroll, setScroll] = useState(0);

  let movies: Array<Movie> = [
    { title: 'Movie 1' },
    { title: 'Movie 2' },
    { title: 'Movie 3' },
    { title: 'Movie 4' },
    { title: 'Movie 5' },
    { title: 'Movie 6' },
    { title: 'Movie 7' },
    { title: 'Movie 8' },
    { title: 'Movie 9' },
    { title: 'Movie 10' }
  ];

  // movieWidthInPx = movieWidthInRem * Px/Rem
  let movieWidthInPx =
    18 * parseFloat(getComputedStyle(document.documentElement).fontSize);

  // Width of movies div (viewport width) in movies
  let moviesDivWidth = window.innerWidth / movieWidthInPx;

  function slide(direction: number) {
    // Return if the first movie is all the way to the left
    if (scroll <= 0 && direction < 0) return;

    // If final movie is not yet reached, keep scrolling
    if (direction < 0 || scroll + direction + moviesDivWidth < movies.length)
      setScroll(Math.floor(scroll + direction));
    // If the final movie is cut off by the screen's width, clicking one more time will move it to the right as far as possible without going past the final movie.
    else if (scroll + direction + moviesDivWidth - 1 < movies.length)
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
          {movies.map((movie, index) => (
            <div className="movie" key={index}>
              <p>{movie.title}</p>
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
