import React from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { AllData } from "./Data/AllData";
import { Outlet } from "react-router-dom";
import { ThemeProvider, useTheme } from "./Data/ThemeContext";

function AppContent() {
  const { darkMode } = useTheme();

  return (
    <div className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AllData>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AllData>
  );
}

export default App;