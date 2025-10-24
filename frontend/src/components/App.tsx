import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* in case of invalid route, return to home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
