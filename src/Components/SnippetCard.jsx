import React, { useContext } from "react";
import { apiValue } from "../Data/AllData";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SnippetCard({ snippet, darkMode }) {
  const { deleteSnippet, toggleFavorite, startEditSnippet } = useContext(apiValue);

  return (
    <div className={`card shadow-sm mb-3 ${darkMode ? "bg-dark text-light" : ""}`}>
      <div className="card-body">
        <h5 className={`card-title ${darkMode ? "text-white" : "text-dark"}`}>
          {snippet.title}
        </h5>

        <SyntaxHighlighter
          language={snippet.language?.toLowerCase() || "javascript"}
          style={darkMode ? oneDark : oneLight}
          showLineNumbers
          wrapLines={false}
          customStyle={{
            background: "transparent",
            padding: "0.5rem",
            margin: 0,
            borderRadius: "6px",
            fontSize: "0.9rem",
          }}
        >
          {snippet.code}
        </SyntaxHighlighter>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className={`snippet-language ${darkMode ? "text-light" : "text-muted"}`}>
            {snippet.language}
          </small>

          <div className="d-flex align-items-center gap-2">
            <i
              className={`fa-star favorite-icon ${snippet.favorite ? "fas text-warning" : "far text-muted"}`}
              onClick={() => toggleFavorite(snippet.id)}
            ></i>

            <button
              className="btn btn-edit"
              onClick={() => startEditSnippet(snippet)}
              title="Edit Snippet"
            >
              <i className="fas fa-pen"></i>
            </button>

            <button
              className="btn btn-delete"
              onClick={() => deleteSnippet(snippet.id)}
              title="Delete Snippet"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}