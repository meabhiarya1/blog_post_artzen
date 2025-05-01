import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const withAuthProtection = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login", { replace: true });
      } else {
        setIsCheckingAuth(false);
      }
    }, [navigate]);

    if (isCheckingAuth) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuthProtection;
