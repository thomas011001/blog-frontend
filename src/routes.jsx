import { createBrowserRouter } from "react-router-dom";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);

export default router;
