import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);
  const token = auth.split(" ")[1];
  try {
    const payload = verifyAccessToken(token) as any;
    (req as any).user = payload;
    next();
  } catch {
    return res.sendStatus(401);
  }
}
