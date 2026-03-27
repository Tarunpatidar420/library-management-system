import { useEffect, useState } from "react";
import { getPendingRequestsReportApi } from "../../api/reportApi";

function PendingIssueRequestsPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getPendingRequestsReportApi();
      setRows(data);
    };
    load();
  }, []);

  return (
    <div className="page-card">
      <h2 className="page-title">Pending Issue Requests</h2>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Item</th>
              <th>Status</th>
              <th>Request Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id}>
                <td>{r.userId?.name}</td>
                <td>{r.itemId?.title}</td>
                <td>{r.status}</td>
                <td>{new Date(r.requestDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PendingIssueRequestsPage;