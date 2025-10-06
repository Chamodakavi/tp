import React, { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // store user info if needed

  const login = (credentialResponse) => {
    try {
      // Decode the Google JWT credential to extract user details
      const decoded = jwtDecode(credentialResponse.credential);
      setUser({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });
      setIsLoggedIn(true);
      console.log("OAuth Token:", credentialResponse.credential);
    } catch (err) {
      setUser(null);
      setIsLoggedIn(false);
      // Optionally handle or log error
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
