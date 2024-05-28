import { createContext, useState, useContext, useCallback } from 'react';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = useCallback(() => {
    setAuthenticated(true);
  }, []);
  const signup = useCallback(() => {
    setAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setAuthenticated(false);
  }, []);

  return (
    <authContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
