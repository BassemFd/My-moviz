import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Genre from "./pages/Genre";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home type="movie" /> },
      { path: "series", element: <Home type="tv" /> },
      { path: "search", element: <Search /> },
      { path: "genre/:type/:id", element: <Genre /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
