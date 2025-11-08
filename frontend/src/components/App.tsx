import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {MovieDescription} from "./pages"
import NavBar from './NavBar';
import Home from './Home';
import './App.css';

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* in case of invalid route, return to home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/movie/:movieId" element={<MovieDescription />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
