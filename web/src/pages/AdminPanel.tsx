import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../authContext";

export default function AdminPanel() {
  const { logout } = useAuth();
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/user/admin/metrics");
        setMetrics(data);
      } catch (err) {
        console.error("Admin metrics alınmadı:", err);
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <nav style={{ marginBottom: 20, paddingBottom: 10, borderBottom: "1px solid #ccc" }}>
        <Link to="/dashboard" style={{ marginRight: 15 }}>Dashboard</Link>
        <Link to="/admin" style={{ marginRight: 15 }}>Admin Panel</Link>
        <button onClick={logout} style={{ marginLeft: "auto", float: "right" }}>
          Logout
        </button>
      </nav>

      <h2>Admin Panel</h2>
      <h3>Admin Metrics:</h3>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
}
