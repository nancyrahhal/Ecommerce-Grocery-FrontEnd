import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {toast } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ allowedRoles }) => {
  let decodedToken = {};
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))


  const token = user?.accessToken;
  if (token) {
    decodedToken = jwtDecode(token);
  }

  const hasRole = allowedRoles.includes(decodedToken.role);

  if (!token) {
    toast.error("Please Login First!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return <Navigate to="/login" replace />;
  } else if (!hasRole) {
    toast.error("Please Login with the right Role!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    // localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
