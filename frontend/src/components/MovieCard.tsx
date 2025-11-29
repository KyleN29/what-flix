import { Link } from 'react-router-dom';
import type { Movie } from '../services/MovieService';
import './MovieCard.css';

interface Props {
  movie: Movie;
  aspectRatio?: number; // optional for flexibility
}

function MovieCard({ movie, aspectRatio = 3 / 4.2 }: Props) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-card-inner" style={{ aspectRatio }}>
        <img
          src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
          alt={movie.title}
          className="movie-img"
        />

        <div className="hover-popup">
          <p>
            <b>
              {movie.title} ({movie.release_date?.substring(0, 4)})
            </b>

            <div className="watch-later" title="Add to Watch Later">
              <b>+</b>
            </div>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
