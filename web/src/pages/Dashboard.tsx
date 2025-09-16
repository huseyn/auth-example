import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../authContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/user/profile");
        setProfile(data);
      } catch (err) {
        console.error("Profil yüklənmədi:", err);
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <nav style={{ marginBottom: 20, paddingBottom: 10, borderBottom: "1px solid #ccc" }}>
        <Link to="/dashboard" style={{ marginRight: 15 }}>Dashboard</Link>
        {user?.role === "admin" && (
          <Link to="/admin" style={{ marginRight: 15 }}>Admin Panel</Link>
        )}
        <button onClick={logout} style={{ marginLeft: "auto", float: "right" }}>
          Logout
        </button>
      </nav>

      <h2>Dashboard</h2>
      <p>Salam, {user?.email} ({user?.role})</p>

      <h3>Serverdən gələn profil:</h3>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}
