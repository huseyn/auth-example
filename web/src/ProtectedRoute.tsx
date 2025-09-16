import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

export function ProtectedRoute({ roles }: { roles?: Array<"user" | "admin"> }) {
  const { user } = useAuth();

  if (!user) {
    // Login olmayıb → login səhifəsinə yönləndir
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Login olub, amma icazəsi yoxdur
    return <Navigate to="/forbidden" replace />;
  }

  // Əgər hər şey qaydasındadırsa → uşaqları göstər
  return <Outlet />;
}
