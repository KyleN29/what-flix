import { createContext, useContext, useState } from 'react';

// Provide editor open/close state and actions
const PreferenceEditorContext = createContext({
  isOpen: false,
  openEditor: () => {},
  closeEditor: () => {}
});

export function PreferenceEditorProvider({
  children
}: React.PropsWithChildren) {
  // Track whether the editor panel is open
  const [isOpen, setIsOpen] = useState(false);

  // Open the editor
  const openEditor = () => setIsOpen(true);

  // Close the editor
  const closeEditor = () => setIsOpen(false);

  return (
    <PreferenceEditorContext.Provider
      value={{ isOpen, openEditor, closeEditor }}
    >
      {children}
    </PreferenceEditorContext.Provider>
  );
}

export function usePreferenceEditor() {
  // Access editor state and actions via context
  return useContext(PreferenceEditorContext);
}
