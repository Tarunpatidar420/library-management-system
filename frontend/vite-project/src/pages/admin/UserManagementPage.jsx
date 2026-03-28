import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  passwordRuleText,
  validatePassword,
} from "../../utils/validators";

function UserManagementPage() {
  const [mode, setMode] = useState("new");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [historyData, setHistoryData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    role: "user",
    isActive: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load users");
    }
  };

  useEffect(() => {
    if (mode === "existing") {
      fetchUsers();
    }
  }, [mode]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordError(validatePassword(value));
    }
  };

  const onEditChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const createUser = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const passwordValidationMessage = validatePassword(formData.password);
    if (passwordValidationMessage) {
      setPasswordError(passwordValidationMessage);
      return;
    }

    try {
      const response = await api.post("/users", formData);
      setMessage(response.data.message || "User created successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      setPasswordError("");
      setMode("existing");
      fetchUsers();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create user");
    }
  };

  const handleView = async (id) => {
    setMessage("");
    setError("");
    setHistoryData(null);

    try {
      const response = await api.get(`/users/${id}`);
      const user = response.data;
      setSelectedUser(user);
      setEditData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        isActive: user.isActive ?? true,
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch user");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!selectedUser?._id) return;

    try {
      const response = await api.put(`/users/${selectedUser._id}`, editData);
      setMessage(response.data.message || "User updated successfully");
      fetchUsers();
      handleView(selectedUser._id);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update user");
    }
  };

  const handleToggleStatus = async (id) => {
    setMessage("");
    setError("");

    try {
      const response = await api.patch(`/users/${id}/status`);
      setMessage(response.data.message || "User status updated successfully");
      fetchUsers();

      if (selectedUser?._id === id) {
        handleView(id);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    setMessage("");
    setError("");

    try {
      const response = await api.delete(`/users/${id}`);
      setMessage(response.data.message || "User deleted successfully");
      fetchUsers();

      if (selectedUser?._id === id) {
        setSelectedUser(null);
        setHistoryData(null);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete user");
    }
  };

  const handleHistory = async (id) => {
    setMessage("");
    setError("");

    try {
      const response = await api.get(`/users/${id}/history`);
      setHistoryData(response.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch user history");
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

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      {mode === "new" ? (
        <form className="form-grid" onSubmit={createUser}>
          <div className="form-row">
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Password</label>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={onChange}
                required
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
            <select name="role" value={formData.role} onChange={onChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {passwordError && <p className="error-text">{passwordError}</p>}

          <button className="btn btn-primary" type="submit">
            Create User
          </button>
        </form>
      ) : (
        <>
          <div className="table-wrap" style={{ marginTop: "20px" }}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.isActive ? "Active" : "Inactive"}</td>
                    <td>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={() => handleView(user._id)}
                        >
                          View
                        </button>

                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={() => handleHistory(user._id)}
                        >
                          History
                        </button>

                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={() => handleToggleStatus(user._id)}
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
                        </button>

                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan="6">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {selectedUser && (
            <div className="page-card" style={{ marginTop: "20px" }}>
              <h3 style={{ marginBottom: "14px" }}>View / Edit User</h3>

              <form className="form-grid" onSubmit={handleUpdate}>
                <div className="form-row">
                  <label>Name</label>
                  <input
                    name="name"
                    value={editData.name}
                    onChange={onEditChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={editData.email}
                    onChange={onEditChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <label>Role</label>
                  <select
                    name="role"
                    value={editData.role}
                    onChange={onEditChange}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="form-row">
                  <label>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={editData.isActive}
                      onChange={onEditChange}
                    />{" "}
                    Active User
                  </label>
                </div>

                <button className="btn btn-primary" type="submit">
                  Update User
                </button>
              </form>
            </div>
          )}

          {historyData && (
            <div className="page-card" style={{ marginTop: "20px" }}>
              <h3 style={{ marginBottom: "14px" }}>User History</h3>

              <p>
                <strong>Name:</strong> {historyData.user?.name}
              </p>
              <p>
                <strong>Email:</strong> {historyData.user?.email}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {historyData.history?.createdAt
                  ? new Date(historyData.history.createdAt).toLocaleString()
                  : "-"}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {historyData.history?.updatedAt
                  ? new Date(historyData.history.updatedAt).toLocaleString()
                  : "-"}
              </p>
              <p>
                <strong>Total Transactions:</strong>{" "}
                {historyData.history?.totalTransactions ?? 0}
              </p>

              <div className="table-wrap" style={{ marginTop: "16px" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Book</th>
                      <th>Issue Date</th>
                      <th>Return Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.history?.transactions?.length > 0 ? (
                      historyData.history.transactions.map((item) => (
                        <tr key={item._id}>
                          <td>{item.bookName || item.itemId?.title || "-"}</td>
                          <td>
                            {item.issueDate
                              ? new Date(item.issueDate).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>
                            {item.returnDate
                              ? new Date(item.returnDate).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>{item.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No history found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserManagementPage;