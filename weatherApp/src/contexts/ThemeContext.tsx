import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ConfigProvider, theme } from "antd";
import type { ThemeMode, ThemeContextType } from "../types/theme.types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export { ThemeContext };

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme as ThemeMode;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setThemeMode(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    document.body.style.backgroundColor =
      themeMode === "dark" ? "#141414" : "#f0f2f5";
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      return newTheme;
    });
  };

  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: themeMode === "dark" ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorBgContainer: themeMode === "dark" ? "#141414" : "#fff",
            colorBgLayout: themeMode === "dark" ? "#141414" : "#f0f2f5",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
