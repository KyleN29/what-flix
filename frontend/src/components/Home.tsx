import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieService, { type Movie } from '../services/MovieService';
import CategorySlider from './CategorySlider';
import './Home.css';

function Home() {
  const { data: popularMovies } = useQuery<Movie[]>({
    queryKey: ['popularMovies'],
    queryFn: () => MovieService.getPopularMovies()
  });

  const topThree = popularMovies?.slice(0, 3) ?? [];

  // Index of the hero movie currently shown
  const [heroIndex, setHeroIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (topThree.length === 0) return;

    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % topThree.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [topThree]);

  const featured = topThree[heroIndex];

  return (
    <div className="home">
      {featured && (
        <div 
          className="hero fade"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${featured.backdrop_path})`
          }}
        >
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title">{featured.title}</h1>
            <p className="hero-desc">{featured.overview}</p>

            <div className="hero-buttons">
              <button className="btn-primary">Details</button>
              <button className="btn-secondary">More Like This</button>
            </div>

            <div className="hero-dots">
              {topThree.map((_, idx) => (
                <div
                  key={idx}
                  className={`dot ${idx === heroIndex ? 'active' : ''}`}
                  onClick={() => setHeroIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {popularMovies && (
        <CategorySlider title="Popular Movies" movies={popularMovies} />
      )}
    </div>
  );
}

export default Home;
