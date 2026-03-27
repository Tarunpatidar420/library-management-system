import { useEffect, useState } from "react";
import { getActiveIssuesReportApi } from "../../api/reportApi";

function ActiveIssuesPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getActiveIssuesReportApi();
      setRows(data);
    };
    load();
  }, []);

  return (
    <div className="page-card">
      <h2 className="page-title">Active Issues</h2>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Book</th>
              <th>User</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id}>
                <td>{r.bookName}</td>
                <td>{r.userId?.name}</td>
                <td>{new Date(r.issueDate).toLocaleDateString()}</td>
                <td>{new Date(r.returnDate).toLocaleDateString()}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActiveIssuesPage;