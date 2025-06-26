import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Navigate, useLocation } from "react-router";
import Swal from "sweetalert2";

const PrivateProvider = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#3289c9]"></span>
      </div>
    );
  }

  if (!user) {
    Swal.fire({
      icon: "info",
      title: "Please Login",
      text: "You need to be logged in to access this page",
      timer: 2000,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateProvider;
