import React, { useState, useEffect, ReactNode } from "react";
import Axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (email: string, password: string) => {},
  onLogout: () => {},
});

export function AuthContextProvider(props: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = async () => {
    try {
      const response = await Axios.get("/logout");
      console.log("logout response", response);

      if (response.status === 200) {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        console.log("Logout successful");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
