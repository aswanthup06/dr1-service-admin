import React from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function RequireAuth({ allowedRoles }) {
    const [auth, setAuth] = useState(null);  
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulating login by fetching from localStorage or state
    const userData = JSON.parse(localStorage.getItem('user')); 
    if (userData) {
      setAuth(userData);
    }
    setIsLoading(false);
  }, [location]);

  if (!isLoading) {
    if (auth?.userType === allowedRoles[0]) {
      return <Outlet />;
    } else if (auth?.userId) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    } else {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }
  return (
    <div>
      Loading..
    </div>
  )
}
