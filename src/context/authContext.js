import { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const register = useCallback(async (details) => {
    try {
      const response = await axios.post('/api/register', details);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const login = useCallback(async (credential) => {
    try {
      const response = await axios.post('/api/login', credential);
      setAuthenticated(true);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const passwordRecovery = useCallback(async (email) => {
    try {
      const response = await axios.post('/api/password-recovery', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const verifyMFA = useCallback((token) => {
    try {
      const response = axios.post('/api/verify-mfa', { token });
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const verifyEmail = useCallback((token) => {
    try {
      const response = axios.post('/api/verify-email', { token: token });
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = () => {
    setAuthenticated(false);
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        login,
        register,
        logout,
        verifyEmail,
        verifyMFA,
        passwordRecovery,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
