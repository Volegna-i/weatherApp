import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoggingOut } = useAuth();

  if (!user) {
    return isLoggingOut ? (
      <Navigate to="/login" replace />
    ) : (
      <Navigate to="/403" replace />
    );
  }

  return <>{children}</>;
};
