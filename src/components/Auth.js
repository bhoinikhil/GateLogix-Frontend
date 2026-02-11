import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const getRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch {
    return null;
  }
};

export const isLoggedIn = () => !!getToken();

export const logout = () => {
  localStorage.removeItem("token");
};