import { Link } from "react-router-dom";

function ReportsHomePage() {
  return (
    <div className="page-card">
      <h2 className="page-title">Reports Menu</h2>

      <div className="menu-grid">
        <div className="menu-card">
          <h3>Master List of Books</h3>
          <Link className="nav-link" to="/reports/books">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>Master List of Movies</h3>
          <Link className="nav-link" to="/reports/movies">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>Master List of Memberships</h3>
          <Link className="nav-link" to="/reports/memberships">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>Active Issues</h3>
          <Link className="nav-link" to="/reports/active-issues">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>Overdue Returns</h3>
          <Link className="nav-link" to="/reports/overdue-returns">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>Pending Issue Requests</h3>
          <Link className="nav-link" to="/reports/pending-requests">
            Open
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReportsHomePage;
