import { usePreferenceEditor } from '../context/PreferenceEditorContext';
import { useEffect, useState } from 'react';
import './PreferenceEditor.css';
import GenreRanking from './GenreRanking';
import GenreService, {type Genre} from '../services/GenreService';

function PreferenceEditor() {
  const { isOpen, closeEditor } = usePreferenceEditor();
  const [visible, setVisible] = useState(false);

  const tabs = ['Genres', 'Actors', 'Favorite Movies'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
  async function loadGenres() {
    const genreList = await GenreService.getGenreList();
    setGenres(genreList);
  }

  loadGenres();
}, []);

  const tabContent = {
    Genres: (
      <div className="tab-body-container">
        <GenreRanking genres={genres}></GenreRanking>
      </div>
    ),

    Actors: (
      <div>
      </div>
    ),

    'Favorite Movies': (
      <div>
      </div>
    )
  };

  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setVisible(true));
    } else {
        document.body.style.overflow = "";
      setVisible(false);
    }
    return () => {
    document.body.style.overflow = "";
  };
  }, [isOpen]);
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
