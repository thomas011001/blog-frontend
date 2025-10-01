/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../config/api";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState(false);

  const login = useCallback(async (body) => {
    try {
      const res = await api.post("/login", body);
      setToken(res.data.data.token);
      localStorage.setItem("token", res.data.data.token);
    } catch (e) {
      setError({ message: e.response?.data.error.message });
    }
  }, []);

  const signup = useCallback(
    async (body) => {
      try {
        await api.post("/signup", body);
        login(body);
      } catch (e) {
        setError({ message: e.response?.data.error.message });
      }
    },
    [login]
  );

  const logout = useCallback(async () => {
    await api.post("/logout");
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, []);

  const getUserInfo = useCallback(async () => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data.user);
      } catch {
        localStorage.removeItem("token");
        setToken(null);
        setError({ message: "Internal server error" });
      }
    };

    if (token) {
      await fetchUser();
    } else {
      try {
        const res = await api.post("/refresh");
        localStorage.setItem("token", res.data.data.accessToken);
        setToken(res.data.data.accessToken);
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, [token, logout]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const value = {
    user,
    loading,
    login,
    logout,
    error,
    signup,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
