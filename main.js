const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const db = require(path.join(__dirname, "db.js"));

// --------------------- Create Main Window ---------------------
function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  // React dev server
  if (!app.isPackaged) {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "build", "index.html"));
  }
}

// --------------------- App Ready ---------------------
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// --------------------- App Close ---------------------
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// --------------------- IPC Handlers ---------------------
ipcMain.handle("add-snippet", (e, snippet) => {
  const stmt = db.prepare(
    "INSERT INTO snippets (title, code, language, favorite) VALUES (?, ?, ?, ?)"
  );
  const result = stmt.run(snippet.title, snippet.code, snippet.language, 0);
  return { id: result.lastInsertRowid, ...snippet, favorite: false };
});

ipcMain.handle("delete-snippet", (e, id) => {
  db.prepare("DELETE FROM snippets WHERE id=?").run(id);
  return true;
});

ipcMain.handle("edit-snippet", (e, snippet) => {
  db.prepare(
    "UPDATE snippets SET title=?, code=?, language=? WHERE id=?"
  ).run(snippet.title, snippet.code, snippet.language, snippet.id);
  return true;
});

ipcMain.handle("toggle-favorite", (e, id) => {
  const row = db.prepare("SELECT favorite FROM snippets WHERE id=?").get(id);
  const fav = row.favorite ? 0 : 1;
  db.prepare("UPDATE snippets SET favorite=? WHERE id=?").run(fav, id);
  return fav;
});

ipcMain.handle("get-snippets", () => {
  return db.prepare("SELECT * FROM snippets ORDER BY created_at DESC").all();
});