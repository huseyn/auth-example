import type { Role } from "./role";

export interface User {
  id: string;
  email: string;
  role: Role;
}
