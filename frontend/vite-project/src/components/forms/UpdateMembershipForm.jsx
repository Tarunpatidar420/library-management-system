import { useState } from "react";

function UpdateMembershipForm({ onSearch, onExtend, onCancel }) {
  const [membershipNumber, setMembershipNumber] = useState("");
  const [extensionType, setExtensionType] = useState("6_months");
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");

    if (!membershipNumber) {
      setError("Membership Number is mandatory.");
      return;
    }

    onSearch?.(membershipNumber);
  };

  return (
    <div className="form-grid">
      <form className="form-grid" onSubmit={handleSearch}>
        <div className="form-row">
          <label>Membership Number</label>
          <input
            value={membershipNumber}
            onChange={(e) => setMembershipNumber(e.target.value)}
            placeholder="Enter membership number"
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>

      <div className="form-row">
        <label>Extension Type</label>
        <select
          value={extensionType}
          onChange={(e) => setExtensionType(e.target.value)}
        >
          <option value="6_months">6 Months</option>
          <option value="1_year">1 Year</option>
          <option value="2_years">2 Years</option>
        </select>
      </div>

      <div className="btn-group">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => onExtend?.(membershipNumber, extensionType)}
        >
          Extend Membership
        </button>

        <button
          className="btn btn-danger"
          type="button"
          onClick={() => onCancel?.(membershipNumber)}
        >
          Cancel Membership
        </button>
      </div>
    </div>
  );
}

export default UpdateMembershipForm;