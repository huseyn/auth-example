import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h2 style={{ color: "crimson" }}>403 — İcazə yoxdur</h2>
      <p>Bu səhifəni görmək üçün kifayət qədər səlahiyyətiniz yoxdur.</p>
      <Link to="/dashboard" style={{ 
        display: "inline-block", 
        marginTop: 20, 
        padding: "8px 16px", 
        backgroundColor: "#007bff", 
        color: "white", 
        textDecoration: "none", 
        borderRadius: "4px" 
      }}>
        Dashboard-a qayıt
      </Link>
    </div>
  );
}
