import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => sessionStorage.getItem("token")
  );

  const [role, setRole] = useState(() => {
    const savedToken = sessionStorage.getItem("token");
    if (!savedToken) return null;
    try {
      return jwtDecode(savedToken).role;
    } catch {
      return null;
    }
  });

  const login = (token) => {
    sessionStorage.setItem("token", token);
    setToken(token);
    setRole(jwtDecode(token).role);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

