import { Link } from "react-router-dom";

function MaintenancePage() {
  return (
    <div className="page-card">
      <h2 className="page-title">Maintenance Menu</h2>

      <div className="menu-grid">
        <div className="menu-card">
          <h3>Add Membership</h3>
          <Link className="nav-link" to="/admin/maintenance/add-membership">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>Update Membership</h3>
          <Link className="nav-link" to="/admin/maintenance/update-membership">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>Add Book / Movie</h3>
          <Link className="nav-link" to="/admin/maintenance/add-book">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>Update Book / Movie</h3>
          <Link className="nav-link" to="/admin/maintenance/update-book">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>User Management</h3>
          <Link className="nav-link" to="/admin/maintenance/user-management">
            Open
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MaintenancePage;