import { useState, useEffect } from 'react';

import './NavBar.css';
import './variables.css';
import { Link } from 'react-router-dom';

function NavBar() {
  const [pageY, setPageY] = useState(0);

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
    return pageY > 5 * 16; // This 16 should be equal to an em, not really sure how to find that though
  };

  return (
    <div
      className={'nav-bar' + (passedScrollThreshold() ? ' minimized' : '')}
      onClick={() => setPageY(0)}
    >
      <Link to="/" className="logo">
        {'W'}
        <span className="expanding">hat</span>
        {/* <span className="second-color"> */}
        {'F'}
        <span className="expanding">lix</span>
        {/* </span> */}
      </Link>
      <Link to="/">Home</Link>
      <Link to="/login">Login/Create Account</Link>
    </div>
  );
}

export default NavBar;
