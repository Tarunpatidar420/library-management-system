import { useEffect, useState } from "react";
import { getMembershipsReportApi } from "../../api/reportApi";

function MasterMembershipsPage() {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getMembershipsReportApi();
      setMemberships(data);
    };
    load();
  }, []);

  return (
    <div className="page-card">
      <h2 className="page-title">Master List of Memberships</h2>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Membership No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((m) => (
              <tr key={m._id}>
                <td>{m.membershipNumber}</td>
                <td>{m.memberName}</td>
                <td>{m.email}</td>
                <td>{m.durationType}</td>
                <td>{m.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MasterMembershipsPage;