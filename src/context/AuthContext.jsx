import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  // Restore authenticated session on mount
  useEffect(() => {
    const token = localStorage.getItem('taskflow_jwt_token');
    if (token) {
      authAPI.getMe()
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem('taskflow_jwt_token');
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = async (credential) => {
    try {
      setAuthError('');
      setLoading(true);
      const res = await authAPI.loginWithGoogle(credential);
      const { token, user: userData, isNewUser, message } = res.data;
      localStorage.setItem('taskflow_jwt_token', token);
      setUser(userData);
      return { user: userData, isNewUser, message };
    } catch (err) {
      const msg = err.response?.data?.message || 'Google authentication failed';
      setAuthError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const loginDemo = async (account = 'user') => {
    try {
      setAuthError('');
      setLoading(true);
      const res = await authAPI.loginDemo(account);
      const { token, user: userData, isNewUser, message } = res.data;
      localStorage.setItem('taskflow_jwt_token', token);
      setUser(userData);
      return { user: userData, isNewUser, message };
    } catch (err) {
      const msg = err.response?.data?.message || 'Demo login failed';
      setAuthError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('taskflow_jwt_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        loginWithGoogle,
        loginDemo,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
