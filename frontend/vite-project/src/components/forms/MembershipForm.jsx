import { useState } from "react";

function MembershipForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    membershipNumber: "",
    memberName: "",
    email: "",
    phone: "",
    address: "",
    durationType: "6_months",
    startDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { membershipNumber, memberName, email, phone, address, startDate } =
      formData;

    if (
      !membershipNumber ||
      !memberName ||
      !email ||
      !phone ||
      !address ||
      !startDate
    ) {
      setError("All fields are mandatory.");
      return;
    }

    onSubmit?.(formData);
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Membership Number</label>
        <input
          name="membershipNumber"
          value={formData.membershipNumber}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label>Member Name</label>
        <input
          name="memberName"
          value={formData.memberName}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label>Phone</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label>Duration</label>
        <select
          name="durationType"
          value={formData.durationType}
          onChange={handleChange}
        >
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
          onChange={handleChange}
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <button className="btn btn-primary" type="submit">
        Add Membership
      </button>
    </form>
  );
}

export default MembershipForm;