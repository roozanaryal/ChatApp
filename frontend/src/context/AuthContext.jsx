import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const getInitialUser = () => {
    try {
      return JSON.parse(localStorage.getItem("chat-user")) || null;
    } catch {
      return null;
    }
  };

  const [authUser, setAuthUserState] = useState(getInitialUser());

  // Keep localStorage in sync
  const setAuthUser = (user) => {
    setAuthUserState(user);
    if (user) {
      localStorage.setItem("chat-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("chat-user");
    }
  };

  // Optional: Listen for localStorage changes from other tabs
  useEffect(() => {
    const onStorage = () => {
      setAuthUserState(getInitialUser());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
