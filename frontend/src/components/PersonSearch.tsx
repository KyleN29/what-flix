import { useState, useEffect } from 'react';
import SuggestionService from '../services/SuggestionService';
import UserService, { type Person } from '../services/UserService';
import './PersonSearch.css';

function PersonSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Person[]>([]);
  const [show, setShow] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);

  // Controls visual state of save button
  const [saving, setSaving] = useState(false);

  // Load user's saved liked people on mount
  useEffect(() => {
    async function loadUserPeople() {
      try {
        const saved = await UserService.getLikedPeople();
        if (saved && saved.length > 0) {
          setSelectedPeople(saved);
        }
      } catch (error) {
        console.error("Error loading user's saved genre ranking:", error);
      }
    }

    loadUserPeople();
  }, []);

  // Fetch suggestion results when typing
  useEffect(() => {
    if (!show) return;
    if (!query) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const data = await SuggestionService.searchPeople(query);

      const convertedData: Person[] = data.map((p) => ({
        person_id: Number(p.id),
        name: p.name
      }));

      setResults(convertedData);
    }, 200);

    return () => clearTimeout(timeout);
  }, [query, show]);

  // Add selected person
  const addPerson = (person: Person) => {
    const exists = selectedPeople.some((p) => p.person_id === person.person_id);

    if (!exists) {
      setSelectedPeople((prev) => [...prev, person]);
    }

    setQuery('');
    setShow(false);
    setResults([]);
  };

  // Remove selected person
  const removePerson = (id: Number) => {
    setSelectedPeople((prev) => prev.filter((p) => p.person_id !== id));
  };

  // Save user's liked people to database
  async function savePreferences() {
    try {
      setSaving(true);
      await UserService.updateLikedPeople(selectedPeople);
      setSaving(false);
    } catch (error) {
      setSaving(false);
      console.error('Error saving preferences:', error);
    }
  }

  return (
    <div className="actor-search-container">
      <button
        className="save-preferences-button"
        onClick={savePreferences}
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Preferences'}
      </button>

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
              key={actor.person_id.toString()}
              className="actor-item"
              onClick={() => addPerson(actor)}
            >
              {actor.name}
            </li>
          ))}
        </ul>
      )}

      <div className="selected-people">
        {selectedPeople.map((person) => (
          <div key={person.person_id.toString()} className="person-chip">
            {person.name}
            <button
              className="remove-chip"
              onClick={() => removePerson(person.person_id)}
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
