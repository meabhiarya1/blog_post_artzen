import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuthProtection = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    useEffect(() => {
      if (!token) {
        navigate("/login", { replace: true });
      }
    }, [token, navigate]);

    if (!token) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuthProtection;
