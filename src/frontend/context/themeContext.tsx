import { createContext, useState, useContext } from 'react';

type ThemeObj = {
  theme: String,
  switchTheme: () => void;
}
const ThemeContext = createContext<ThemeObj>({ theme: 'light', switchTheme: () => { } });

interface ThemeProviderProps {
  children?: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const contextValues: ThemeObj = {
    theme,
    switchTheme
  }
  return (
    <ThemeContext.Provider
      value={contextValues}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
