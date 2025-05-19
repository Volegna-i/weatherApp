import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { message, App } from "antd";
import type { User, LoginCredentials } from "../types/user.types";
import { AuthError } from "../types/error.types";

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

    // Проверяем существование пользователя
    const existingUser = users.find(
      (u: { username: string }) => u.username === credentials.username
    );

    if (!existingUser) {
      throw new AuthError("Пользователь не найден", "USER_NOT_FOUND");
    }

    // Проверяем правильность пароля
    if (existingUser.password !== credentials.password) {
      throw new AuthError("Неверный пароль", "INVALID_PASSWORD");
    }

    // Если все проверки пройдены, авторизуем пользователя
    const authUser = {
      username: credentials.username,
      isAuthenticated: true,
    };
    setUser(authUser);
    setIsLoggingOut(false);
    localStorage.setItem("user", JSON.stringify(authUser));
    message.success("Вход выполнен успешно!");
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
