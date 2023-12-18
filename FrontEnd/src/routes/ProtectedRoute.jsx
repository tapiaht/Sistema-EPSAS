import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";

export default function ProtectedRoute() {
  const auth = useAuth();
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  //const [isAuth,setIsAuth]=useState(false);
  //return isAuth ? <Outlet/>:<Navigate to="/"/>;
}
