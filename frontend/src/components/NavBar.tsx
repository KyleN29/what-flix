import { useState, useEffect } from 'react';

import './NavBar.css';
import './variables.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

function NavBar() {
  const { isLoggedIn } = useAuth();
  const [pageY, setPageY] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const handleScroll = () => {
    setPageY(window.pageYOffset);
  };

  useEffect(() => {
    // When component mounts, add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // When component unmounts, remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const passedScrollThreshold = () => {
    return pageY > 30 * 16; // This 16 should be equal to an em, not really sure how to find that though
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() !== '') navigate(`/search?q=${search.trim()}`);
  };

  return (
    <div className={'nav-bar' + (passedScrollThreshold() ? ' minimized' : '')}>
      <Link to="/" className="logo">
        {'W'}
        <span className="expanding">hat</span>
        {'F'}
        <span className="expanding">lix</span>
      </Link>

      {/* Search bar */}
      <form className="search-bar-container" onSubmit={submitSearch}>
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {/* Right side items */}
      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </>
        ) : (
          <Link to="/login" className="nav-link">
            Login / Create Account
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
