import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const user = Cookies.get("user");
      const token = localStorage.getItem("token");
      if (!user || !token) {
        Cookies.remove("user");
        localStorage.removeItem("token");
        navigate("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth(); // Run initially

    // Set up an interval to check every minute
    const interval = setInterval(() => {
      checkAuth();
    }, 60000); // 60,000 ms = 1 minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [navigate, location]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
