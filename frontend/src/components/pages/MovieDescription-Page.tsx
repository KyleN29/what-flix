import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieService, { type Movie } from '../../services/MovieService';
import './MovieDescription-Page.css';
import '../variables.css';

function MovieDescription(){
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
        try {
            const movies = await MovieService.getPopularMovies();
            const foundMovie = movies.find(m => m.id.toString() === movieId);
            setMovie(foundMovie || null);
        } catch (error) {
            console.error('Error fetching movie:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchMovie();
    }, [movieId]);

    if (loading) return <div>Loading...</div>;
    if (!movie) return <div>Movie not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <p className="text-gray-700 mt-4">{movie.overview}</p>
        <p className="mt-2">Rating: {movie.vote_average}/10</p>
        </div>
    );
}

export default MovieDescription