import { Link } from "react-router-dom";

function TransactionsHomePage() {
  return (
    <div className="page-card">
      <h2 className="page-title">Transactions Menu</h2>

      <div className="menu-grid">
        <div className="menu-card">
          <h3>Check Book Availability</h3>
          <Link className="nav-link" to="/transactions/book-availability">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>Issue Book</h3>
          <Link className="nav-link" to="/transactions/issue">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>Return Book</h3>
          <Link className="nav-link" to="/transactions/return">
            Open
          </Link>
        </div>

        <div className="menu-card">
          <h3>Pay Fine</h3>
          <Link className="nav-link" to="/transactions/pay-fine">
            Open
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TransactionsHomePage;