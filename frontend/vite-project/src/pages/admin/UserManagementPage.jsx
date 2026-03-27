import { useState } from "react";
import api from "../../api/axios";

function UserManagementPage() {
  const [mode, setMode] = useState("new");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createUser = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await api.post("/users", formData);
      setMessage(response.data.message || "User created successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className="page-card">
      <h2 className="page-title">User Management</h2>

      <div className="form-row">
        <label>Mode</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="new">New User</option>
          <option value="existing">Existing User</option>
        </select>
      </div>

      {mode === "new" ? (
        <form className="form-grid" onSubmit={createUser}>
          <div className="form-row">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={onChange} required />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input name="email" type="email" value={formData.email} onChange={onChange} required />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={onChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {message && <p className="success-text">{message}</p>}
          {error && <p className="error-text">{error}</p>}

          <button className="btn btn-primary" type="submit">
            Create User
          </button>
        </form>
      ) : (
        <p>Existing user update screen can be extended here.</p>
      )}
    </div>
  );
}

export default UserManagementPage;