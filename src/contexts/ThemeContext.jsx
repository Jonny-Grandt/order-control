
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create context with default values
const ThemeContext = createContext({
  mode: 'dark',
  toggleTheme: () => {},
});

// Custom hook for using the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme Provider component
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to dark
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'dark';
  });

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Toggle theme function
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Create MUI theme based on current mode
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#03a9f4',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Roboto", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
