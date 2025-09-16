// server/src/routes/auth.ts
import { Router } from "express";
import bcrypt from "bcrypt";
import { users } from "../data/users";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import {
  saveSession,
  revokeSession,
  isSessionValid,
} from "../services/sessionStore";
import { ENV } from "../env";
import { randomUUID } from "crypto";

const router = Router();

function setRefreshCookie(res: any, token: string) {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: false,        // dev mühitdə mütləq false
    sameSite: "lax",      // strict çox vaxt reject edir
    path: "/",            // hər route-da getsin
  });
}


// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const accessToken = signAccessToken(user);
  const jti = randomUUID();
  const refreshToken = signRefreshToken(user, jti);
  saveSession(jti, user.id);

  setRefreshCookie(res, refreshToken);

  res.json({
    accessToken,
    user: { id: user.id, email: user.email, role: user.role },
  });
});

// POST /auth/refresh
router.post("/refresh", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);
  try {
    const payload = verifyRefreshToken(token) as any;
    if (!isSessionValid(payload.jti)) return res.sendStatus(401);

    const user = users.find((u) => u.id === payload.sub);
    if (!user) return res.sendStatus(401);

    // rotation
    revokeSession(payload.jti);
    const newJti = randomUUID();
    const newRefresh = signRefreshToken(user, newJti);
    saveSession(newJti, user.id);

    setRefreshCookie(res, newRefresh);

    const accessToken = signAccessToken(user);
    res.json({
      accessToken,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch {
    return res.sendStatus(401);
  }
});

// POST /auth/logout
router.post("/logout", (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    try {
      const payload = verifyRefreshToken(token) as any;
      revokeSession(payload.jti);
    } catch {}
  }
  res.clearCookie("refreshToken");
  res.sendStatus(200);
});

export default router;
