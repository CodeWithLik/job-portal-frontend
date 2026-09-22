import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// Configure axios base url and interceptors
export const api = axios.create({
  baseURL: 'https://job-portal-backend-bx41.onrender.com/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [systemSettings, setSystemSettings] = useState({});

  const fetchSystemSettings = async () => {
    try {
      const res = await api.get('/system/settings');
      setSystemSettings(res.data);
    } catch (error) {
      console.error('Failed to fetch system settings:', error);
    }
  };

  useEffect(() => {
    fetchSystemSettings();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data.user;
  };

  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    // We intentionally DO NOT save the token or set the user here.
    // The user must verify their email before they can log in.
    return response.data.user;
  };

  
  const updateUser = (updatedFields) => {
    setUser(prev => prev ? { ...prev, ...updatedFields } : null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, systemSettings, fetchSystemSettings, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
