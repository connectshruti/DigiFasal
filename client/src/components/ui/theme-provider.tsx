import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type ColorScheme = "green" | "blue" | "earth" | "system"; // New color scheme type

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColorScheme?: ColorScheme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  colorScheme: ColorScheme;
  setTheme: (theme: Theme) => void;
  setColorScheme: (scheme: ColorScheme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  colorScheme: "system",
  setTheme: () => null,
  setColorScheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// Color scheme definitions
const COLOR_SCHEMES = {
  green: {
    light: {
      primary: "hsl(142, 76%, 36%)", // Emerald green
      background: "hsl(0, 0%, 100%)",
    },
    dark: {
      primary: "hsl(142, 76%, 46%)",
      background: "hsl(240, 10%, 4%)",
    }
  },
  blue: {
    light: {
      primary: "hsl(221, 83%, 53%)", // Azure blue
      background: "hsl(0, 0%, 100%)",
    },
    dark: {
      primary: "hsl(221, 83%, 63%)",
      background: "hsl(240, 10%, 4%)",
    }
  },
  earth: {
    light: {
      primary: "hsl(25, 95%, 53%)", // Terracotta
      background: "hsl(0, 0%, 100%)",
    },
    dark: {
      primary: "hsl(25, 95%, 63%)",
      background: "hsl(240, 10%, 4%)",
    }
  }
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultColorScheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => 
    (localStorage.getItem(`${storageKey}-mode`) as Theme) || defaultTheme
  );
  
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() =>
    (localStorage.getItem(`${storageKey}-scheme`) as ColorScheme) || defaultColorScheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    
    // Apply color scheme variables
    const applyColorScheme = (scheme: ColorScheme) => {
      if (scheme === "system") {
        const preferredScheme = window.matchMedia("(prefers-color-scheme: dark)").matches 
          ? "dark" 
          : "light";
        const colors = COLOR_SCHEMES.green[preferredScheme]; // Default to green for system
        Object.entries(colors).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value);
        });
        return;
      }
      
      const colors = COLOR_SCHEMES[scheme][theme === "dark" ? "dark" : "light"];
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });
    };

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches 
        ? "dark" 
        : "light";
      root.classList.add(systemTheme);
      applyColorScheme(colorScheme);
      return;
    }
    
    root.classList.add(theme);
    applyColorScheme(colorScheme);
  }, [theme, colorScheme]);

  const value = {
    theme,
    colorScheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(`${storageKey}-mode`, theme);
      setTheme(theme);
    },
    setColorScheme: (scheme: ColorScheme) => {
      localStorage.setItem(`${storageKey}-scheme`, scheme);
      setColorScheme(scheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};