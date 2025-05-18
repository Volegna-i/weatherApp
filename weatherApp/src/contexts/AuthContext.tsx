import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { message, App } from "antd";
import type { User, LoginCredentials } from "../types/user.types";

interface AuthContextType {
  user: User | null;
  isLoggingOut: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const login = async (credentials: LoginCredentials) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: { username: string; password: string }) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (user) {
      const authUser = {
        username: credentials.username,
        isAuthenticated: true,
      };
      setUser(authUser);
      setIsLoggingOut(false);
      localStorage.setItem("user", JSON.stringify(authUser));
      message.success("Вход выполнен успешно!");
    } else {
      message.error("Неверный логин или пароль");
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setIsLoggingOut(true);
    setUser(null);
    localStorage.removeItem("user");
    message.info("Вы вышли из системы");
  };

  return (
    <App>
      <AuthContext.Provider value={{ user, isLoggingOut, login, logout }}>
        {children}
      </AuthContext.Provider>
    </App>
  );
};
