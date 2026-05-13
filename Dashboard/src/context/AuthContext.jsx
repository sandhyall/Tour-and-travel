import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loginTime, setLoginTime] = useState(() => {
    return localStorage.getItem("loginTime") || null;
  });

  const login = (token, userData = {}) => {
    localStorage.setItem("token", token);
    localStorage.setItem("loginTime", new Date().toISOString());
    
    // Save user data
    const userInfo = {
      name: userData.name || "Admin User",
      email: userData.email || "admin@travel.com",
      role: userData.role || "Administrator",
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem("user", JSON.stringify(userInfo));
    setToken(token);
    setUser(userInfo);
    setLoginTime(userInfo.loginTime);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
    setToken(null);
    setUser(null);
    setLoginTime(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user, loginTime }}>
      {children}
    </AuthContext.Provider>
  );
};