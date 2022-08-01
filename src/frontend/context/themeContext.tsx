import { createContext, useState, useContext } from "react";
import { ThemeProviderProps } from "../utility";
import { Theme } from "react-toastify";

type ThemeObj = {
  theme: Theme;
  switchTheme: () => void;
};
const ThemeContext = createContext<ThemeObj>({
  theme: "dark",
  switchTheme: () => {},
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const contextValues: ThemeObj = {
    theme,
    switchTheme,
  };
  return (
    <ThemeContext.Provider value={contextValues}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
