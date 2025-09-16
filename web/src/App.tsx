import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./authProvider";
import type { User } from "./types/user";

export function App({ initialUser }: { initialUser: User | null }) {
  return (
    <AuthProvider initialUser={initialUser}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
