import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  roles: UserRole[];
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user, isLoading, checkAccess } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/login');
      } else if (!checkAccess(roles)) {
        navigate('/dashboard');
      }
    }
  }, [user, isLoading, roles, navigate, checkAccess]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !checkAccess(roles)) {
    return null;
  }

  return <>{children}</>;
};
