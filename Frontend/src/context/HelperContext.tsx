import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Helper {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'professional_helper' | 'casual_helper';
  profession?: string;
  address?: string;
  aadhar?: string;
  photo?: string;
  wallet?: number;
}

interface HelperContextType {
  helper: Helper | null;
  setHelper: (helper: Helper | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (helperData: any) => Promise<boolean>;
  logout: () => void;
}

const HelperContext = createContext<HelperContextType | undefined>(undefined);

export const HelperProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [helper, setHelper] = useState<Helper | null>(null);
  const API_URL = 'http://localhost:6900/api/helper/auth';

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.token && data.helper) {
        setHelper(data.helper);
        localStorage.setItem('helper_token', data.token);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const register = async (helperData: any): Promise<boolean> => {
    try {
      // For file upload, use FormData
      const formData = new FormData();
      Object.keys(helperData).forEach(key => {
        if (helperData[key] !== undefined && helperData[key] !== null) {
          formData.append(key, helperData[key]);
        }
      });
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.token && data.helper) {
        setHelper(data.helper);
        localStorage.setItem('helper_token', data.token);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setHelper(null);
    localStorage.removeItem('helper_token');
  };

  return (
    <HelperContext.Provider value={{ helper, setHelper, login, register, logout }}>
      {children}
    </HelperContext.Provider>
  );
};

export const useHelper = () => {
  const context = useContext(HelperContext);
  if (context === undefined) {
    throw new Error('useHelper must be used within a HelperProvider');
  }
  return context;
};