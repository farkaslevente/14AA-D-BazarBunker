import React, { createContext, useContext, useState, useEffect } from 'react';
import userservice from '../Services/userservice';

const UserContext = createContext();

export const useUserStore = () => useContext(UserContext);

export const UserStoreProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {
    name: '',
    token: '',
    id: null,
    role: null,
  });
  const [loggedIn, setLoggedIn] = useState(!!user.token);
  const [message, setMessage] = useState('');

  const login = async (data) => {
    try {
      const resp = await userservice.login(data);
      const userData = resp.data.data;

      setLoggedIn(true);
      setUser(userData);
      setMessage('');
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      setLoggedIn(false);
      setUser({ name: '', token: '', id: null, role: null });
      setMessage(error.response.data.data.error);
      return Promise.reject(error.response);
    }
  };

  const logout = async () => {
    try {
      await userservice.logout(user.token);
      setLoggedIn(false);
      setUser({ name: '', token: '', id: null, role: null });
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('user');
    };
  }, []);

  const value = {
    user,
    loggedIn,
    message,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
