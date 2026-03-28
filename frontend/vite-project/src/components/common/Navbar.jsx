import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/admin/home">Admin</Link> |{" "}
      <Link to="/user/home">User</Link> |{" "}
      <Link to="/login">Logout</Link>
    </nav>
  );
}

export default Navbar;