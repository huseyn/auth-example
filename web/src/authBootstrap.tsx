/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { setAccessToken } from "./tokenStore";

// Create a separate API instance for bootstrap to avoid interceptor issues
const bootstrapApi = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export async function bootstrapAuth(): Promise<any | null> {
  try {
    const { data } = await bootstrapApi.post("/auth/refresh");
    if (data?.accessToken && data?.user) {
      setAccessToken(data.accessToken);
      return data.user;
    }
    // If we get here, the response was malformed
    setAccessToken(null);
    return null;
  } catch (error: any) {
    // This is expected on first visit (no refresh token exists)
    // Silently handle 401 errors, log others for debugging
    if (error?.response?.status !== 401) {
      console.log("Bootstrap auth failed:", error?.message || "Unknown error");
    }
    setAccessToken(null);
    return null;
  }
}
