import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AuthContextType, User, LoginCredentials, RegisterCredentials } from '../types/auth';
import { useDemo } from './DemoContext';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API calls - replace with real API calls later
const mockLogin = async (credentials: LoginCredentials): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    id: '1',
    email: credentials.email,
    username: credentials.email === 'demo@example.com' ? 'Demo User' : 'User1',
  };
};

const mockRegister = async (credentials: RegisterCredentials): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    id: '1',
    email: credentials.email,
    username: credentials.username,
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsDemo } = useDemo();

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const user = await mockLogin({ email, password });
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string, username: string) => {
    try {
      setIsLoading(true);
      const user = await mockRegister({ email, password, username });
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsDemo(false); // Reset demo mode on logout
    localStorage.removeItem('user');
  }, [setIsDemo]);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
