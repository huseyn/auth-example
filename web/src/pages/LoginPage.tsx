import { useState } from "react";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  console.log("login page");

  const [email, setEmail] = useState("user@example.com"); // test üçün hazır dəyər
  const [password, setPassword] = useState("Password123!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Email və ya şifrə yanlışdır");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 320,
        margin: "40px auto",
        display: "grid",
        gap: 12,
      }}
    >
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Şifrə"
      />
      <button disabled={loading}>
        {loading ? "Daxil olunur..." : "Login"}
      </button>
      {error && <div style={{ color: "crimson" }}>{error}</div>}

      <p style={{ fontSize: 12 }}>
        Test üçün: <br />
        <b>User:</b> user@example.com / Password123! <br />
        <b>Admin:</b> admin@example.com / Password123!
      </p>
    </form>
  );
}
