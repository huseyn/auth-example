import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Forbidden from "./pages/Forbidden";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/forbidden", element: <Forbidden /> },
  
  // Root path redirects to dashboard for authenticated users
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> }
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      { path: "/dashboard", element: <Dashboard /> }
    ],
  },
  {
    element: <ProtectedRoute roles={["admin"]} />,
    children: [{ path: "/admin", element: <AdminPanel /> }],
  },

  { path: "*", element: <LoginPage /> }, // Fallback to login
]);
