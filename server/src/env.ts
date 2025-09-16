import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || "development",

  ORIGIN: process.env.ORIGIN || "http://localhost:5173",
  COOKIE_SECURE: process.env.COOKIE_SECURE === "true",

  // JWT üçün ayrıca secret-lər
  ACCESS_SECRET: process.env.ACCESS_SECRET || "access-secret",
  REFRESH_SECRET: process.env.REFRESH_SECRET || "refresh-secret",
};
