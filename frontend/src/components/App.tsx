import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MovieDescription, Login, SearchResults } from './pages';
import { PreferenceEditorProvider } from '../context/PreferenceEditorContext';
import PreferenceEditor from './PreferenceEditor';
import NavBar from './NavBar';
import Home from './Home';
import './App.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PreferenceEditorProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          
            <Route path="/" element={<Home />} />
            <Route path="/movie/:movieId" element={<MovieDescription />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/search" element={<SearchResults />} />

            {/* in case of invalid route, return to home page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
        <PreferenceEditor></PreferenceEditor>
      </BrowserRouter>
      </PreferenceEditorProvider>
    </QueryClientProvider>
  );
}

export default App;
