import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Login from "./Components/Login";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import {AuthProvider} from "./auth/AuthProvider";
//import Dashboard from "./Components/Dashboard";
import Dashboard from "./routes/Dashboard";
//import ProtectedRoute from "./Components/ProtectedRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./routes/Profile";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
     element: <Signup />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);