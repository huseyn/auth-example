import { useEffect, useState } from "react";
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
      <h2>Dashboard</h2>
      <p>Salam, {user?.email}</p>

      <h3>Serverdən gələn profil:</h3>
      <pre>{JSON.stringify(profile, null, 2)}</pre>

      <button onClick={logout} style={{ marginTop: 20 }}>
        Logout
      </button>
    </div>
  );
}
