import { useState, useEffect } from 'react';
import SuggestionService, { type Person } from '../services/SuggestionService';
import './PersonSearch.css';

function PersonSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Person[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) return;
    if (!query) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const data = await SuggestionService.searchPeople(query);
      setResults(data);
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="actor-search-container">
      <input
        type="text"
        value={query}
        placeholder="Search people..."
        onChange={(e) => {
          setQuery(e.target.value);
          setShow(true);
        }}
        className="actor-search-input"
      />

      {results.length > 0 && (
        <ul className="actor-search-dropdown">
          {results.map((actor: any) => (
            <li
              key={actor.id}
              className="actor-item"
              onClick={() => {
                setQuery(actor.name);
                setShow(false);
                setResults([]);
              }}
            >
              {actor.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PersonSearch;
