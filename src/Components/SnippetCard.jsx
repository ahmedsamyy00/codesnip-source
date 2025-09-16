import React, { useContext, useState } from "react";
import { apiValue } from "../Data/AllData";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SnippetCard({ snippet, darkMode }) {
  const { deleteSnippet, toggleFavorite, startEditSnippet } = useContext(apiValue);
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const handleCopy = (e) => {
    e.stopPropagation(); 
    navigator.clipboard.writeText(snippet.code).then(() => {
      setCopyButtonText("Copied!");
      setTimeout(() => {
        setCopyButtonText("Copy");
      }, 2000);
    }).catch(err => {
      console.error("Failed to copy code: ", err);
      setCopyButtonText("Error");
    });
  };

  return (
    <div className={`card shadow-sm mb-3 ${darkMode ? "bg-dark text-light" : ""}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          
          <h5 className={`card-title mb-0 ${darkMode ? "text-white" : "text-dark"}`}>
            {snippet.title}
          </h5>

          <button
            className="btn btn-copy-header" 
            onClick={handleCopy}
            title="Copy Code"
          >
            <i className="fas fa-copy"></i> {copyButtonText}
          </button>
        </div>

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