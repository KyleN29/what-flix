import { usePreferenceEditor } from '../context/PreferenceEditorContext';
import { useEffect, useState } from 'react';
import './PreferenceEditor.css';
import GenreRanking from './GenreRanking';
import GenreService, { type Genre } from '../services/GenreService';
import PersonSearch from './PersonSearch';

function PreferenceEditor() {
  const { isOpen, closeEditor } = usePreferenceEditor();
  const [visible, setVisible] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);

  // Map tab labels to rendered content
  const tabContent: Record<string, any> = {
    Genres: (
      <div className="tab-body-container">
        <GenreRanking genres={genres}></GenreRanking>
      </div>
    ),
    People: (
      <div className="tab-body-container">
        <PersonSearch></PersonSearch>
      </div>
    )
  };

  const tabs = Object.keys(tabContent);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Load genre list on mount
  useEffect(() => {
    async function loadGenres() {
      const genreList = await GenreService.getGenreList();
      setGenres(genreList);
    }
    loadGenres();
  }, []);

  // Handle open/close transitions and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => setVisible(true));
    } else {
      document.body.style.overflow = '';
      setVisible(false);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Do not render when closed
  if (!isOpen) return;

  return (
    <>
      <div
        className={`preference-editor-backdrop ${visible ? 'animate-in' : ''}`}
        onClick={closeEditor}
      ></div>

      <div
        className={`preference-editor-container ${visible ? 'animate-in' : ''}`}
      >
        <div className="preference-editor">
          <div className="preference-editor-header">
            Personalize Your Experience
          </div>

          <div className="preference-editor-tabs">
            {tabs.map((tabName) => (
              <div
                className={`tab ${activeTab == tabName ? 'active-tab' : ''}`}
                onClick={() => setActiveTab(tabName)}
              >
                {tabName}
              </div>
            ))}
          </div>

          <div className="preference-editor-body">{tabContent[activeTab]}</div>
        </div>
      </div>
    </>
  );
}

export default PreferenceEditor;
