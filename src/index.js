import { createRoot } from "react-dom/client";

import { createHashRouter, RouterProvider } from "react-router-dom";
import { AllData } from "./Data/AllData";
import App from "./App";
import Home from "./Pages/Home";
import Settings from "./Pages/Settings";
import Landing from "./Landing/Landing";
import "./css/styles.css";
import About from "./Pages/About";

const router = createHashRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AllData>
    <RouterProvider router={router} />
  </AllData>
);