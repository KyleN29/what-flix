import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MovieService, { type Movie } from '../../services/MovieService';
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
    
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="text-gray-700 mt-4">{movie.overview}</p>
            <p className="mt-2">Rating: {movie.vote_average}/10</p>
        </div>
    );
}

export default MovieDescription;