import { useContext } from "react";
import { apiValue } from "../Data/AllData";
import JSZip from "jszip";

function Settings() {
  const { snippets, setSnippets } = useContext(apiValue);

  const getExtension = (lang) => {
    switch (lang) {
      case "JavaScript":
        return "js";
      case "Python":
        return "py";
      case "HTML":
        return "html";
      case "CSS":
        return "css";
      case "C++":
        return "cpp";
      default:
        return "txt";
    }
  };

  
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(snippets, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "snippets.json";
    link.click();
  };

  
  const handleExportZIP = async () => {
    const zip = new JSZip();
    snippets.forEach((s) => {
      zip.file(`${s.title}.${getExtension(s.language)}`, s.code);
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = "snippets.zip";
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        setSnippets(imported);
      } catch (err) {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container">
      <h2>Settings</h2>
      <button className="btn btn-primary mb-2" onClick={handleExportJSON}>
        Export JSON
      </button>
      <button className="btn btn-secondary mb-2 ms-2" onClick={handleExportZIP}>
        Export ZIP
      </button>
      <br />
      <input
        type="file"
        accept=".json"
        onChange={handleImport}
        className="btn btn-info mt-2"
      />
    </div>
  );
}

export default Settings;
