import { useState } from "react";
import { createMembershipApi } from "../../api/membershipApi";

function AddMembershipPage() {
  const [formData, setFormData] = useState({
    membershipNumber: "",
    memberName: "",
    email: "",
    phone: "",
    address: "",
    durationType: "6_months",
    startDate: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = await createMembershipApi(formData);
      setMessage(data.message || "Membership created successfully");
      setFormData({
        membershipNumber: "",
        memberName: "",
        email: "",
        phone: "",
        address: "",
        durationType: "6_months",
        startDate: "",
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create membership");
    }
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Add Membership</h2>

      <form className="form-grid" onSubmit={onSubmit}>
        <div className="form-row">
          <label>Membership Number</label>
          <input
            name="membershipNumber"
            value={formData.membershipNumber}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Member Name</label>
          <input
            name="memberName"
            value={formData.memberName}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Email</label>
          <input name="email" type="email" value={formData.email} onChange={onChange} required />
        </div>

        <div className="form-row">
          <label>Phone</label>
          <input name="phone" value={formData.phone} onChange={onChange} required />
        </div>

        <div className="form-row">
          <label>Address</label>
          <textarea name="address" value={formData.address} onChange={onChange} required />
        </div>

        <div className="form-row">
          <label>Duration</label>
          <select name="durationType" value={formData.durationType} onChange={onChange}>
            <option value="6_months">6 Months</option>
            <option value="1_year">1 Year</option>
            <option value="2_years">2 Years</option>
          </select>
        </div>

        <div className="form-row">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={onChange}
            required
          />
        </div>

        {message && <p className="success-text">{message}</p>}
        {error && <p className="error-text">{error}</p>}

        <button className="btn btn-primary" type="submit">
          Add Membership
        </button>
      </form>
    </div>
  );
}

export default AddMembershipPage;