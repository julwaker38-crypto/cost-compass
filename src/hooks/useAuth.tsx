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
  logout: () => void;
  checkAccess: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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

// HOC for protected routes
export const withAuth = (
  WrappedComponent: React.ComponentType,
  allowedRoles?: UserRole[]
) => {
  return function ProtectedRoute(props: any) {
    const { user, isLoading, checkAccess } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading) {
        if (!user) {
          navigate('/login');
        } else if (allowedRoles && !checkAccess(allowedRoles)) {
          navigate('/dashboard');
        }
      }
    }, [user, isLoading, navigate]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      );
    }

    if (!user) {
      return null;
    }

    if (allowedRoles && !checkAccess(allowedRoles)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
