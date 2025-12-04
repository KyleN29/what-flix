import { useState, useEffect } from 'react';
import SuggestionService, { type Person } from '../services/SuggestionService';
import './PersonSearch.css';

function PersonSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Person[]>([]);
  const [show, setShow] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);

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

  // Add selected person
  const addPerson = (person: Person) => {
    const exists = selectedPeople.some(p => p.id === person.id);
    if (!exists) {
      setSelectedPeople(prev => [...prev, person]);
    }
    setQuery('');
    setShow(false);
    setResults([]);
  };

  // Remove selected person
  const removePerson = (id: string) => {
    setSelectedPeople(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="actor-search-container">
      <input
        type="text"
        value={query}
        placeholder="Search actors and directors..."
        onChange={(e) => {
          setQuery(e.target.value);
          setShow(true);
        }}
        className="actor-search-input"
      />

      {show && results.length > 0 && (
        <ul className="actor-search-dropdown">
          {results.map((actor) => (
            <li
              key={actor.id}
              className="actor-item"
              onClick={() => addPerson(actor)}
            >
              {actor.name}
            </li>
          ))}
        </ul>
      )}
      <div className="selected-people">
        {selectedPeople.map(person => (
          <div key={person.id} className="person-chip">
            {person.name}
            <button
              className="remove-chip"
              onClick={() => removePerson(person.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
    
  );
}

export default PersonSearch;
