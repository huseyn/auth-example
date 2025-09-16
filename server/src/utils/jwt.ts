import jwt from "jsonwebtoken";
import { ENV } from "../env";

export function signAccessToken(user: { id: string; email: string; role: string }) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    ENV.ACCESS_SECRET,
    { expiresIn: "15m" }
  );
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ENV.ACCESS_SECRET);
}

export function signRefreshToken(payload: any, jti: string) {
  return jwt.sign(
    { sub: payload.id, jti },
    ENV.REFRESH_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, ENV.REFRESH_SECRET);
}
