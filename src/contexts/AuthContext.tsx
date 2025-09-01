import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'admin' | 'trainer') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: 'admin' | 'trainer'): Promise<boolean> => {
    // Mock authentication - in real app this would call an API
    if (role === 'admin' && email === 'admin@attendify.com' && password === 'admin123') {
      setUser({
        id: '1',
        name: 'Admin User',
        email: 'admin@attendify.com',
        role: 'admin'
      });
      return true;
    } else if (role === 'trainer' && email === 'trainer@attendify.com' && password === 'trainer123') {
      setUser({
        id: '2',
        name: 'John Trainer',
        email: 'trainer@attendify.com',
        role: 'trainer'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};