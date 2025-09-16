import bcrypt from "bcrypt";

const passwordHash = bcrypt.hashSync("Password123!", 10);

export const users = [
  {
    id: "1",
    email: "user@example.com",
    role: "user",
    passwordHash,
  },
  {
    id: "2",
    email: "admin@example.com",
    role: "admin",
    passwordHash,
  },
];
