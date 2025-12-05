import { createContext, useContext, useEffect, useState } from 'react';

const PreferenceEditorContext = createContext({
  isOpen: false,
  openEditor: () => {},
  closeEditor: () => {}
});

export function PreferenceEditorProvider({
  children
}: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const openEditor = () => setIsOpen(true);
  const closeEditor = () => setIsOpen(false);

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen])
  return (
    <PreferenceEditorContext.Provider
      value={{ isOpen, openEditor, closeEditor }}
    >
      {children}
    </PreferenceEditorContext.Provider>
  );
}

export function usePreferenceEditor() {
  return useContext(PreferenceEditorContext);
}
