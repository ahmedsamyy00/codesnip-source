const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  addSnippet: (snippet) => ipcRenderer.invoke("add-snippet", snippet),
  deleteSnippet: (id) => ipcRenderer.invoke("delete-snippet", id),
  editSnippet: (snippet) => ipcRenderer.invoke("edit-snippet", snippet),
  toggleFavorite: (id) => ipcRenderer.invoke("toggle-favorite", id),
  getSnippets: () => ipcRenderer.invoke("get-snippets"),

  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
  }
});
