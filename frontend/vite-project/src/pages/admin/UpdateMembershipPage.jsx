import { useState } from "react";
import {
  getMembershipByNumberApi,
  extendMembershipApi,
  cancelMembershipApi,
} from "../../api/membershipApi";

function UpdateMembershipPage() {
  const [membershipNumber, setMembershipNumber] = useState("");
  const [membership, setMembership] = useState(null);
  const [extensionType, setExtensionType] = useState("6_months");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchMembership = async () => {
    setMessage("");
    setError("");
    try {
      const data = await getMembershipByNumberApi(membershipNumber);
      setMembership(data);
    } catch (err) {
      setMembership(null);
      setError(err?.response?.data?.message || "Membership not found");
    }
  };

  const handleExtend = async () => {
    try {
      const data = await extendMembershipApi(membershipNumber, { extensionType });
      setMembership(data);
      setMessage("Membership extended successfully");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to extend membership");
    }
  };

  const handleCancel = async () => {
    try {
      const data = await cancelMembershipApi(membershipNumber);
      setMembership(data.membership);
      setMessage("Membership cancelled successfully");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to cancel membership");
    }
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Update Membership</h2>

      <div className="form-grid">
        <div className="form-row">
          <label>Membership Number</label>
          <input
            value={membershipNumber}
            onChange={(e) => setMembershipNumber(e.target.value)}
            placeholder="Enter membership number"
          />
        </div>

        <div className="btn-group">
          <button className="btn btn-primary" onClick={fetchMembership}>
            Search
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}

        {membership && (
          <>
            <div className="page-card">
              <p>
                <strong>Name:</strong> {membership.memberName}
              </p>
              <p>
                <strong>Email:</strong> {membership.email}
              </p>
              <p>
                <strong>Status:</strong> {membership.status}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {membership.endDate ? new Date(membership.endDate).toLocaleDateString() : "-"}
              </p>
            </div>

            <div className="form-row">
              <label>Extension Type</label>
              <select value={extensionType} onChange={(e) => setExtensionType(e.target.value)}>
                <option value="6_months">6 Months</option>
                <option value="1_year">1 Year</option>
                <option value="2_years">2 Years</option>
              </select>
            </div>

            <div className="btn-group">
              <button className="btn btn-primary" onClick={handleExtend}>
                Extend Membership
              </button>
              <button className="btn btn-danger" onClick={handleCancel}>
                Cancel Membership
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UpdateMembershipPage;