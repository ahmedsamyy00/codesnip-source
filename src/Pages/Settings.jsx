import { useContext } from "react";
import { apiValue } from "../Data/AllData";
import JSZip from "jszip";

function Settings() {
    const { snippets, setSnippets } = useContext(apiValue);

    const getExtension = (lang) => {
        switch (lang) {
            case "JavaScript": return "js";
            case "Python": return "py";
            case "HTML": return "html";
            case "CSS": return "css";
            case "C++": return "cpp";
            default: return "txt";
        }
    };

    const handleExportJSON = () => {
        const dataStr = JSON.stringify(snippets, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "snippets.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportZIP = async () => {
        const zip = new JSZip();
        snippets.forEach((s) => {
            const safeTitle = s.title.replace(/[^a-z0-9]/gi, '_'); // لجعل اسم الملف آمنًا
            zip.file(`${safeTitle}.${getExtension(s.language)}`, s.code);
        });
        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        const link = document.createElement("a");
        link.href = url;
        link.download = "snippets.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const imported = JSON.parse(event.target.result);
                if (!Array.isArray(imported)) {
                    alert("Invalid file format: JSON must be an array of snippets.");
                    return;
                }
                setSnippets(prevSnippets => [...prevSnippets, ...imported]);
                alert("Snippets imported successfully!");
            } catch (err) {
                console.error("Failed to parse JSON file:", err);
                alert("Invalid file format. Please check the console (F12) for details.");
            }
        };
        e.target.value = null;
        reader.readAsText(file);
    };

    const getLanguageFromExtension = (ext) => {
        switch (ext.toLowerCase()) {
            case "js": return "JavaScript";
            case "py": return "Python";
            case "html": return "HTML";
            case "css": return "CSS";
            case "cpp": return "C++";
            default: return "PlainText";
        }
    };

    const handleImportSingleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const code = event.target.result;
                if (code === null || typeof code !== 'string') {
                    throw new Error("File could not be read as text. It might be a binary file.");
                }
                const filename = file.name;
                const lastDot = filename.lastIndexOf('.');
                const title = lastDot > 0 ? filename.substring(0, lastDot) : filename;
                const extension = lastDot > 0 ? filename.substring(lastDot + 1) : '';
                const newSnippet = {
                    id: Date.now().toString(),
                    title: title,
                    code: code,
                    language: getLanguageFromExtension(extension),
                    favorite: false,
                };
                setSnippets(prevSnippets => [newSnippet, ...prevSnippets]);
                alert(`Snippet "${title}" imported successfully!`);
            } catch (err) {
                console.error("Error processing file:", err);
                alert("An error occurred while processing the file. Please check the console (F12) for details.");
            }
        };

        reader.onerror = () => {
            console.error("FileReader error:", reader.error);
            alert("An error occurred while reading the file.");
        };

        e.target.value = null;
        reader.readAsText(file);
    };

    return (
        <div className="container">
            <h2>Settings</h2>
            <p>Export all your snippets as a single JSON file or a ZIP archive of individual code files.</p>
            <button className="btn btn-primary mb-2" onClick={handleExportJSON}>
                Export to JSON
            </button>
            <button className="btn btn-secondary mb-2 ms-2" onClick={handleExportZIP}>
                Export to ZIP
            </button>
            <hr />
            <p>Import snippets from a JSON file or add a new snippet from a single code file.</p>
            <label className="btn btn-info mt-2">
                Import from JSON
                <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    style={{ display: "none" }}
                />
            </label>
            <label className="btn btn-success mt-2 ms-2">
                Import from Code File
                <input
                    type="file"
                    accept=".js,.py,.html,.css,.cpp,.txt"
                    onChange={handleImportSingleFile}
                    style={{ display: "none" }}
                />
            </label>
        </div>
    );
}

export default Settings;