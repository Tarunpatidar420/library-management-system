import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{ width: "200px", background: "#ddd", padding: "10px" }}>
      <p><Link to="/transactions/book-availability">Book Availability</Link></p>
      <p><Link to="/transactions/issue">Issue Book</Link></p>
      <p><Link to="/transactions/return">Return Book</Link></p>
      <p><Link to="/transactions/fine">Pay Fine</Link></p>
    </div>
  );
}

export default Sidebar;