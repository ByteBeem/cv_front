import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [backendURL] = useState('http://54.165.154.55:4000/api');

  return (
    <AuthContext.Provider value={{ backendURL }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
