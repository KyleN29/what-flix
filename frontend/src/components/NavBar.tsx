import { useState, useEffect } from 'react';

import './NavBar.css';
import './variables.css';

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
    return pageY > 3 * 16;
  };

  return (
    <div
      className={'nav-bar' + (passedScrollThreshold() ? ' minimized' : '')}
      onClick={() => setPageY(0)}
    >
      <p>
        Hello World!Hello World!Hello World!Hello World!Hello World!Hello
        World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello
        World!Hello World!Hello World!Hello World!
      </p>
    </div>
  );
}

export default NavBar;
