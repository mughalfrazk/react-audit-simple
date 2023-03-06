import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./local-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useLocalStorage("session", null);
  const navigate = useNavigate();

  const login = async (data) => {
    setSession(data);
    navigate("/", { replace: true });
  };

  const logout = () => {
    setSession(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      session,
      login,
      logout
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
