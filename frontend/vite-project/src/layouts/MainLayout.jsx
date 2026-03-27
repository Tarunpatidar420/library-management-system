import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-inner">
          <div className="brand">Library Management System</div>

          <div className="nav-links">
            {user?.role === "admin" && (
              <>
                <Link className="nav-link" to="/admin/home">
                  Admin Home
                </Link>
                <Link className="nav-link" to="/admin/maintenance">
                  Maintenance
                </Link>
              </>
            )}

            {user?.role === "user" && (
              <Link className="nav-link" to="/user/home">
                User Home
              </Link>
            )}

            <Link className="nav-link" to="/reports">
              Reports
            </Link>
            <Link className="nav-link" to="/transactions">
              Transactions
            </Link>

            <button className="btn btn-danger" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;