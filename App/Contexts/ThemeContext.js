import React, { createContext, useContext, useState, useMemo } from "react";
import { useColorScheme } from "react-native";

const lightTheme = {
  colors: {
    statusBarStyle: "dark",
    headerBackground: "#f8f8f8",
    background: "#FFFFFF",
    text: "#000000",
    drawerBackground: "#FFFFFF",
    iconColor: "#000000",
    primary: "#6200EE",
    secondary: "#03DAC6",
    disabled: "#9e9e9e",
    inactive: "black",
  },
  icons: {
    home: "home",
    favorites: "heart",
    themeToggle: "brightness-6",
    notifications: "bell",
  },
};

const darkTheme = {
  colors: {
    statusBarStyle: "light",
    headerBackground: "#333",
    background: "#121212",
    text: "#FFFFFF",
    drawerBackground: "#121212",
    iconColor: "#FFFFFF",
    primary: "#BB86FC",
    secondary: "#03DAC6",
    disabled: "#b0bec5",
    inactive: "white",
  },
  icons: {
    home: "home",
    favorites: "heart",
    themeToggle: "brightness-6",
    notifications: "bell",
  },
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(
    systemTheme === "dark" ? darkTheme : lightTheme
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === darkTheme ? lightTheme : darkTheme));
  };

  const value = useMemo(() => ({ ...theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
