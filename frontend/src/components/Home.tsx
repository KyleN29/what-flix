import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieService, { type Movie } from '../services/MovieService';
import RecommendationService, {
  type MovieScore
} from '../services/RecommendationService.js';
import CategorySlider from './CategorySlider';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { usePreferenceEditor } from '../context/PreferenceEditorContext.js';

function Home() {
  const navigate = useNavigate();
  const { openEditor } = usePreferenceEditor();
  const { isLoggedIn } = useAuth();
  const { data: popularMovies } = useQuery<Movie[]>({
    queryKey: ['popularMovies'],
    queryFn: () => MovieService.getPopularMovies()
  });
  const { data: recommendedMovies } = useQuery<MovieScore[]>({
    queryKey: ['recommendedMovies'],
    queryFn: () => RecommendationService.getGeneralRecommendations()
  });
  const { data: lesserKnownRecommendedMovies } = useQuery<MovieScore[]>({
    queryKey: ['lesserKnownRecommendedMovies'],
    queryFn: () => RecommendationService.getLesserKnownRecommendations()
  });

  const topThree = popularMovies?.slice(0, 3) ?? [];

  // Index of the hero movie currently shown
  const [heroIndex, setHeroIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (topThree.length === 0) return;

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % topThree.length);
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

          <div className="hero-inner">
            <div className="hero-left">
              <h1 className="hero-title">{featured.title}</h1>
              <p className="hero-desc">{featured.overview}</p>

              <div className="hero-buttons">
                <button
                  className="btn-primary"
                  onClick={() => navigate('/movie/' + featured.id)}
                >
                  Details
                </button>
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

            <div className="hero-right">
              {isLoggedIn ? (
                <>
                  <h2>Your Movie Taste</h2>
                  <p>
                    Customize your genre rankings to improve your
                    recommendations.
                  </p>
                  <button
                    onClick={() => openEditor()}
                    className="btn-primary hero-login-btn"
                  >
                    Update Preferences
                  </button>
                </>
              ) : (
                <>
                  <h2>Personalize Your Experience</h2>
                  <p>
                    Log in to rank your favorite genres and unlock smarter movie
                    recommendations.
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="btn-primary hero-login-btn"
                  >
                    Log In to Personalize
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div >
        {popularMovies && (
          <CategorySlider title="Popular Movies" movies={popularMovies} />
        )}
      </div>
      <div className="pt-4">
        {recommendedMovies && (
          <CategorySlider
            title="Recommended Movies"
            movies={recommendedMovies}
          />
        )}
      </div>

      <div className="pt-4">
        {lesserKnownRecommendedMovies && (
          <CategorySlider
            title="Movies You Probably Missed"
            movies={lesserKnownRecommendedMovies}
          />
        )}
      </div>

      {/* <p style={{ height: '50vh' }}>e</p> */}
    </div>
  );
}

export default Home;
