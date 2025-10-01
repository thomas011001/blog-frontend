import { createBrowserRouter } from "react-router-dom";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Home from "./routes/Home";
import Layout from "./routes/Layout.jsx";
import Post from "./routes/Post.jsx";
import New from "./routes/New.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/posts/:id", element: <Post /> },
      { path: "new", element: <New /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);

export default router;
