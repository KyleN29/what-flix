import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <p>Hello Worlder!</p>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* in case of invalid route, return to home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
