import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";

import App from "./App.jsx";
import Frontend from "./components/Frontend.jsx";
import Home,{loader as ListaCategoria} from "./page/Home.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Frontend />,
    children: [
      {
        index: true,
        element: <Home />,
        loader:ListaCategoria,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>

    <RouterProvider router={router} />
  </StrictMode>
);
