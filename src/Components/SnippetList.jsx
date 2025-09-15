import React, { useContext, useState } from "react";
import { apiValue } from "../Data/AllData";
import SnippetCard from "./SnippetCard";
import { useTheme } from "../Data/ThemeContext";

export default function SnippetList() {
  const { snippets } = useContext(apiValue);
  const { darkMode } = useTheme();

  const [search, setSearch] = useState("");
  const [filterLang, setFilterLang] = useState("");

  const filteredSnippets = snippets.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchesLang = filterLang ? s.language === filterLang : true;
    return matchesSearch && matchesLang;
  });

  return (
    <div className={`${darkMode ? "text-light" : "text-dark"}`}>
      <div className="d-flex flex-wrap gap-2 mb-3">
        <input
          type="text"
          className="form-control w-auto"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select w-auto"
          value={filterLang}
          onChange={(e) => setFilterLang(e.target.value)}
        >
          <option value="">All</option>
          <option>JavaScript</option>
          <option>Python</option>
          <option>HTML</option>
          <option>CSS</option>
          <option>C++</option>
        </select>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSearch("");
            setFilterLang("");
          }}
        >
          Clear
        </button>
      </div>

      <div className="row">
        {filteredSnippets.length === 0 && <p>No snippets found</p>}
        {filteredSnippets.map((snip) => (
          <div key={snip.id} className="col-md-6 col-lg-4 mb-3">
            <SnippetCard snippet={snip} darkMode={darkMode} />
          </div>
        ))}
      </div>
    </div>
  );
}