import api from "./api";
import { setAccessToken } from "./tokenStore";

export async function bootstrapAuth() {
  try {
    const { data } = await api.post("/auth/refresh");
    setAccessToken(data.accessToken);
    return data.user;  // 🔹 user qaytarırıq
  } catch {
    setAccessToken(null);
    return null;
  }
}
