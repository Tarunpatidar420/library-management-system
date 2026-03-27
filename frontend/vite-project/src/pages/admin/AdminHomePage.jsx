import { Link } from "react-router-dom";

function AdminHomePage() {
  return (
    <div className="page-card">
      <h2 className="page-title">Admin Home Page</h2>

      <div className="menu-grid">
        <div className="menu-card">
          <h3>Maintenance</h3>
          <p>Manage memberships, books and users.</p>
          <Link className="nav-link" to="/admin/maintenance">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>Reports</h3>
          <p>View books, memberships, issues and overdue data.</p>
          <Link className="nav-link" to="/reports">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>Transactions</h3>
          <p>Check availability, issue book, return book, pay fine.</p>
          <Link className="nav-link" to="/transactions">
            Open
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;