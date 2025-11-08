import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MovieService, { type Movie } from '../../services/MovieService';
import MovieRatings from '../MovieRatingsDisplay';
import './MovieDescription-Page.css';
import '../variables.css';

function MovieDescription(){
    const { movieId } = useParams();
    
    const { data: movie, isLoading, isError } = useQuery<Movie>({
        queryKey: ['getMovieDetail', movieId],
        queryFn: () => MovieService.getMovieDetail(movieId!),
        enabled: !!movieId, 
    });
    
    if (isLoading) return <div>. . . Loading</div>;
    if (isError || !movie) return <div>Movie not found</div>;

    const backgroundStyle = movie?.backdrop_path 
    ? {
        backgroundImage: `
            linear-gradient(to bottom, 
                transparent 0%, 
                transparent 50%,  
                var(--black) 100%
            ),
            url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        }
    : {};

    const movieDetails = (
        <div className=' flexbox items-center'>
            <p className="text-6xl font-bold wrap-normal movie-title">{movie.title}</p>
            <p className="text-xl wrap-normal movie-title movie-title movie-subtitle">{movie.release_date}</p>
            <MovieRatings vote_average={movie.vote_average} vote_count={movie.vote_count} />
        </div>
    );

    const poster = (
        <img
            src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
            alt={movie.title}
            className="movie-img"
        />
    );


    var trailerKey = "M_HjrYiwS2I"
    var trailerSrc = "https://www.youtube.com/embed/" + trailerKey;
    const trailer = (
        <div className='movie-trailer'>
            <iframe
                width="560"
                height="315"
                src={trailerSrc}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                />
        </div>
    );

    const description = (
        <p className="text-lg leading-loose max-w-3xl italic border-l-4 pl-4 movie-description">
            {movie.overview}
        </p>
    )
    
    return (
        <div className='MovieDescription' style={backgroundStyle}>
            <div className="max-w-7xl mx-auto px-4 py-6 container ">
                <div className="grid grid-cols-3">
                    <div className="col-span-1">
                        {poster}
                    </div>
                    <div className='col-span-2'>
                        <div className='movie-details'>
                            {movieDetails}
                            {trailer}
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDescription;