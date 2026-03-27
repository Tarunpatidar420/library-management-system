import { useEffect, useState } from "react";
import { getOverdueReturnsReportApi } from "../../api/reportApi";

function OverdueReturnsPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getOverdueReturnsReportApi();
      setRows(data);
    };
    load();
  }, []);

  return (
    <div className="page-card">
      <h2 className="page-title">Overdue Returns</h2>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Book</th>
              <th>User</th>
              <th>Return Date</th>
              <th>Fine</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id}>
                <td>{r.bookName}</td>
                <td>{r.userId?.name}</td>
                <td>{new Date(r.returnDate).toLocaleDateString()}</td>
                <td>{r.fineCalculated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OverdueReturnsPage;