import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
       style={{
    padding: "1rem 2rem",
    borderBottom: "1px solid #1e293b",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#050816",
    color: "white",
  }}
    >
      <h2 style={{ margin: 0 }}>Festival Planner</h2>

      <nav
  style={{
    display: "flex",
    gap: "1rem",
  }}
>
  <Link
    to="/"
    style={{ color: "white", textDecoration: "none" }}
  >
    Dashboard
  </Link>

  <Link
    to="/admin"
    style={{ color: "white", textDecoration: "none" }}
  >
    Admin
  </Link>

  <Link
    to="/login"
    style={{ color: "white", textDecoration: "none" }}
  >
    Login
  </Link>
</nav>
    </header>
  );
}