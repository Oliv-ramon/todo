import { createContext, useState } from "react";

interface Auth {
  userId: number;
  userName: string;
  token: string;
}

interface IAuthContext {
  auth: Auth | null;
  login: (auth: Auth) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface Props {
  children: React.ReactNode;
}

const LOCAL_STORAGE_KEY = "todoit-auth";
const persistedAuth = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_KEY) as string
);

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<Auth | null>(persistedAuth);

  function login(auth: Auth) {
    setAuth(auth);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(auth));
  }

  function logout() {
    setAuth(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
