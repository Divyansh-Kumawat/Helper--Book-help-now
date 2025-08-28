import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'user';
  wallet?: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const API_URL = 'http://localhost:6900/api/user/auth';

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.token && data.user && data.user.type === 'user') {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (data.token && data.user && data.user.type === 'user') {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};