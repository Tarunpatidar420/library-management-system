import { Link } from "react-router-dom";

function UserHomePage() {
  return (
    <div className="page-card">
      <h2 className="page-title">User Home Page</h2>

      <div className="menu-grid">
        <div className="menu-card">
          <h3>Reports</h3>
          <p>View available reports.</p>
          <Link className="nav-link" to="/reports">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>Transactions</h3>
          <p>Check availability, issue, return and pay fine.</p>
          <Link className="nav-link" to="/transactions">
            Open
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;