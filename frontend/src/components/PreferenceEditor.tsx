
import { usePreferenceEditor } from '../context/PreferenceEditorContext';
import { useEffect, useState } from 'react';
import './PreferenceEditor.css'


function PreferenceEditor() {
    const {isOpen, closeEditor} = usePreferenceEditor()
      const [visible, setVisible] = useState(false);

    
    useEffect(() => {
        if (isOpen) {
        requestAnimationFrame(() => setVisible(true));
        } else {
        setVisible(false);
        }
    }, [isOpen]);
    if (!isOpen) return;

  return (
    <>
    <div className={`preference-editor-backdrop ${visible ? "animate-in" : ""}`} onClick={closeEditor}></div>
    <div className={`preference-editor-container ${visible ? "animate-in" : ""}`}>
        <div className="preference-editor">
            <div className="preference-editor-header header-gradient">
                Personalize Your Experience
            </div>
            <div className="preference-editor-tabs">
                <div className="active-tab">
                    Genres
                </div>
                <div>
                    Actors
                </div>
                <div>
                    Favorite Movies
                </div>
            </div>
            <div className="preference-editor-body">
                Personalize Your Experience
            </div>
        </div>
    </div>
    </>
  );
}

export default PreferenceEditor;
