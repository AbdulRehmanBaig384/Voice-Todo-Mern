// // app/context/AuthContext.js
// 'use client';
// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   const login = (t) => {
//     setToken(t);
//     localStorage.setItem('token', t);
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);




// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const stored = localStorage.getItem('token');
//     if (stored) setToken(stored);
//   }, []);

//   const login = (jwt) => {
//     localStorage.setItem('token', jwt);
//     setToken(jwt);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// 'use client'
// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   const login = (token) => {
//     setToken(token);
//     localStorage.setItem('token', token); // Optional
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// 'use client'
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   // 🔁 Load token from localStorage on first load
//   useEffect(() => {
//     const stored = localStorage.getItem("token");
//     if (stored) setToken(stored);
//   }, []);

//   const login = (newToken) => {
//     setToken(newToken);
//     localStorage.setItem("token", newToken);
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);





'use client'
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // prevent flicker

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored);
    setLoading(false);
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
