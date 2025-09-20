import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./colors.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import Toast from "./components/Toast.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Toast>
      <RouterProvider router={router} />
    </Toast>
  </AuthProvider>
);
