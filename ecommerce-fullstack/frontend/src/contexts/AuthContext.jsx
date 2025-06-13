import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = Cookies.get('token');
      if (savedToken) {
        try {
          setToken(savedToken);
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Failed to load user:', error);
          Cookies.remove('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      const { token: newToken, user: userData } = response;
      
      setToken(newToken);
      setUser(userData);
      Cookies.set('token', newToken, { expires: 7, secure: true, sameSite: 'strict' });
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      const { token: newToken, user: newUser } = response;
      
      setToken(newToken);
      setUser(newUser);
      Cookies.set('token', newToken, { expires: 7, secure: true, sameSite: 'strict' });
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove('token');
  };

  const isAdmin = () => {
    return user?.roles?.includes('ADMIN');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAdmin,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
