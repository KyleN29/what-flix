import CategorySlider from './CategorySlider';

import './variables.css';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <p style={{ height: '30vh' }}>Hello World!</p>
      <CategorySlider title="Category Slider" />
      <p style={{ height: '50vh' }}>Hello World!</p>
      <p style={{ height: '50vh' }}>Hello World!</p>
    </div>
  );
}

export default Home;
