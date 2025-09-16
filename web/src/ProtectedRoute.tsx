import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

import type { Role } from "./types/role";

export function ProtectedRoute({ roles }: { roles?: Role[] }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
