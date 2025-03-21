
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context with default values
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Simulate login
  const login = async (email) => {
    // In a real app, this would be an API call
    setIsLoading(true);
    const mockUser = {
      email,
      name: email.split('@')[0],
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
