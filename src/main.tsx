import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./routes/routes";
import "./styles/styles.css";
import { TodoProvider } from "./context/TodoContext";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoProvider>
      <RouterProvider router={router} />
    </TodoProvider>
  </StrictMode>
);
