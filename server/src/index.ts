import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./env";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ENV.ORIGIN, credentials: true }));

app.get("/", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes); 
app.use("/user", userRoutes);

app.listen(ENV.PORT, () => {
  console.log(`API running at http://localhost:${ENV.PORT}`);
});
