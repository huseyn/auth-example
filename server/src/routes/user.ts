import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const router = Router();

// GET /user/profile
router.get("/profile", authenticate, (req, res) => {
  const user = (req as any).user;
  res.json({ id: user.sub, email: user.email, role: user.role });
});

// GET /user/admin/metrics
router.get("/admin/metrics", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ usersCount: 123, revenue: "42k" });
});

export default router;
