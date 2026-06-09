import {
  NavLink,
  useNavigate,
} from "react-router-dom";
function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
  style={{
    width: "250px",
    height: "100vh",
    background: "#111827",
    color: "white",
    padding: "20px",

    position: "fixed",
    top: 0,
    left: 0,
  }}
>
      <h2>CIG Gallery</h2>

      <hr />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <NavLink
  to="/dashboard"
  style={({ isActive }) => ({
    color: "white",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "8px",
    background: isActive
      ? "#2563eb"
      : "transparent",
    fontWeight: isActive
      ? "bold"
      : "normal",
  })}
>
  🏠 Dashboard
</NavLink>

<NavLink
  to="/events"
  style={({ isActive }) => ({
    color: "white",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "8px",
    background: isActive
      ? "#2563eb"
      : "transparent",
    fontWeight: isActive
      ? "bold"
      : "normal",
  })}
>
  📅 Events
</NavLink>

<NavLink
  to="/upload"
  style={({ isActive }) => ({
    color: "white",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "8px",
    background: isActive
      ? "#2563eb"
      : "transparent",
    fontWeight: isActive
      ? "bold"
      : "normal",
  })}
>
  📤 Upload Media
</NavLink>

<NavLink
  to="/gallery"
  style={({ isActive }) => ({
    color: "white",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "8px",
    background: isActive
      ? "#2563eb"
      : "transparent",
    fontWeight: isActive
      ? "bold"
      : "normal",
  })}
>
  🖼 Gallery
</NavLink>
        {user?.role ===
          "admin" && (
          <Link
            to="/analytics"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            📊 Analytics
          </Link>
        )}

        <button
          onClick={logout}
          style={{
            marginTop: "20px",
            padding: "10px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;