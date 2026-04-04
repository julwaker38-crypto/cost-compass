import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'manager' | 'cashier';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isManager: boolean;
  isCashier: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  checkAccess: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const TEMPLATE_ACCOUNTS = [
  {
    id: 'template-manager',
    name: 'Admin Manager',
    email: 'admin@costflow.com',
    password: 'admin123',
    role: 'manager' as UserRole,
  },
  {
    id: 'template-cashier',
    name: 'Kasir CostFlow',
    email: 'kasir@costflow.com',
    password: 'kasir123',
    role: 'cashier' as UserRole,
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Seed template accounts if not exist
    const existingUsers = JSON.parse(localStorage.getItem('costflow_users') || '[]');
    const hasTemplates = existingUsers.some((u: any) => u.id === 'template-manager');
    if (!hasTemplates) {
      const merged = [...existingUsers, ...TEMPLATE_ACCOUNTS];
      localStorage.setItem('costflow_users', JSON.stringify(merged));
    }

    // Load current session
    const storedUser = localStorage.getItem('costflow_auth');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('costflow_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (authUser: AuthUser) => {
    localStorage.setItem('costflow_auth', JSON.stringify(authUser));
    setUser(authUser);
  };

  const logout = () => {
    localStorage.removeItem('costflow_auth');
    setUser(null);
    navigate('/login');
  };

  const checkAccess = (allowedRoles: UserRole[]) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isManager: user?.role === 'manager',
    isCashier: user?.role === 'cashier',
    login,
    logout,
    checkAccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
