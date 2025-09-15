import React, { createContext, useState, useEffect } from "react";

export const apiValue = createContext();

export function AllData({ children }) {
  const isElectron = !!window.electronAPI;
  const [snippets, setSnippets] = useState([]);
  const [editSnippet, setEditSnippet] = useState(null);

  // Load snippets on start
  useEffect(() => {
    if (isElectron) {
      (async () => {
        try {
          const rows = await window.electronAPI.getAllSnippets?.();
          if (rows) setSnippets(rows);
        } catch (err) {
          console.error(err);
        }
      })();
    } else {
      const saved = localStorage.getItem("snippets");
      setSnippets(
        saved
          ? JSON.parse(saved)
          : [
              { id: 1, title: "Hello World", code: "console.log('Hi')", language: "JavaScript", favorite: false },
              { id: 2, title: "CSS Example", code: "body { margin: 0 }", language: "CSS", favorite: false }
            ]
      );
    }
  }, [isElectron]);

  // Save to localStorage if not Electron
  useEffect(() => {
    if (!isElectron) {
      localStorage.setItem("snippets", JSON.stringify(snippets));
    }
  }, [isElectron, snippets]);

  // Add or edit snippet
  const addSnippet = async (snippet) => {
    if (editSnippet) {
      await editSnippetFunc({ id: editSnippet.id, ...snippet });
      setEditSnippet(null);
      return;
    }

    if (isElectron) {
      const savedSnippet = await window.electronAPI.addSnippet(snippet);
      setSnippets(prev => [...prev, savedSnippet]);
    } else {
      setSnippets(prev => [...prev, { id: Date.now(), favorite: false, ...snippet }]);
    }
  };

  // Edit snippet
  const editSnippetFunc = async (snippet) => {
    if (isElectron) {
      await window.electronAPI.editSnippet(snippet);
    }
    setSnippets(prev => prev.map(s => s.id === snippet.id ? snippet : s));
  };

  // Delete snippet
  const deleteSnippet = async (id) => {
    if (isElectron) {
      await window.electronAPI.deleteSnippet(id);
    }
    setSnippets(prev => prev.filter(s => s.id !== id));
  };

  // Toggle favorite
  const toggleFavorite = async (id) => {
    if (isElectron) {
      const fav = await window.electronAPI.toggleFavorite(id);
      setSnippets(prev => prev.map(s => s.id === id ? { ...s, favorite: fav } : s));
    } else {
      setSnippets(prev => prev.map(s => s.id === id ? { ...s, favorite: !s.favorite } : s));
    }
  };

  // Start edit
  const startEditSnippet = (snippet) => setEditSnippet(snippet);

  return (
    <apiValue.Provider
      value={{
        snippets,
        addSnippet,
        deleteSnippet,
        toggleFavorite,
        editSnippet,
        startEditSnippet
      }}
    >
      {children}
    </apiValue.Provider>
  );
}