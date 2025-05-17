import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import type { ThemeContextType } from "../types/theme.types";

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme необходимо использовать внутри ThemeProvider");
  }
  return context;
};
