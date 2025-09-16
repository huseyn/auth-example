import { useEffect, useState } from "react";
import api from "../api";

export default function AdminPanel() {
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
      <h2>Admin Panel</h2>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
}
