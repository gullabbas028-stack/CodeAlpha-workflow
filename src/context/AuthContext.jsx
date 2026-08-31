import { createContext, useContext, useEffect, useState } from "react";
import { currentUser } from "../data/mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("workflow_session");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("workflow_session", JSON.stringify(user));
    else localStorage.removeItem("workflow_session");
  }, [user]);

  const login = async (email, _password) => {
    await new Promise((r) => setTimeout(r, 550));
    setUser({ ...currentUser, email: email || currentUser.email });
    return true;
  };

  const signup = async (name, email, _password) => {
    await new Promise((r) => setTimeout(r, 650));
    setUser({ ...currentUser, name: name || currentUser.name, email: email || currentUser.email });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
