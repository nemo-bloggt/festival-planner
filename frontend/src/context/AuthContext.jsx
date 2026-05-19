import { createContext, useContext, useEffect, useState } from "react";
import pb from "../lib/pocketbase";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(pb.authStore.model);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => {
      setUser(pb.authStore.model);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function login(email, password) {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);

    setUser(authData.record);
  }

  function logout() {
    pb.authStore.clear();
    setUser(null);
  }

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}