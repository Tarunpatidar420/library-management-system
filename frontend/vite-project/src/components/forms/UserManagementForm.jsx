import { useState } from "react";
import {
  passwordRuleText,
  validatePassword,
} from "../../utils/validators";

function UserManagementForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordError(validatePassword(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Name, email and password are mandatory.");
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }

    onSubmit?.(formData);
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
        />
      </div>

      <div className="form-row">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
      </div>

      <div className="form-row">
        <label>Password</label>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="page-card" style={{ padding: "12px" }}>
        <strong>Password Rules:</strong>
        <ul style={{ marginTop: "8px", paddingLeft: "18px" }}>
          {passwordRuleText.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>

      <div className="form-row">
        <label>Role</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {passwordError && <p className="error-text">{passwordError}</p>}
      {error && <p className="error-text">{error}</p>}

      <button className="btn btn-primary" type="submit">
        Create User
      </button>
    </form>
  );
}

export default UserManagementForm;