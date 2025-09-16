import React, { useState, useEffect, useContext } from "react";
import { apiValue } from "../Data/AllData";
import { useTheme } from "../Data/ThemeContext";

export default function SnippetForm() {
  const { addSnippet, editSnippet } = useContext(apiValue);
  const { darkMode } = useTheme();

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (editSnippet) {
      setTitle(editSnippet.title);
      setLanguage(editSnippet.language);
      setCode(editSnippet.code);
    }
  }, [editSnippet]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !code) return;

    addSnippet({ title, language, code });

    setTitle("");
    setLanguage("JavaScript");
    setCode("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-3 rounded shadow-sm mb-3 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <h5 className="mb-3">
        {editSnippet ? "Edit Snippet" : "Add Snippet"}
      </h5>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select
        className="form-select mb-2"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option>JavaScript</option>
        <option>Python</option>
        <option>HTML</option>
        <option>CSS</option>
        <option>C++</option>
      </select>

      <textarea
        className="form-control mb-2"
        rows="5"
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />

      <button type="submit" className="btn btn-primary">
        {editSnippet ? "Update" : "Save"}
      </button>
    </form>
  );
}