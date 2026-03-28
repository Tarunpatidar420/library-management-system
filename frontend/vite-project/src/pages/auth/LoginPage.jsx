import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    adminPassKey: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showAdminPassKey, setShowAdminPassKey] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isAdminEmail =
    formData.email.toLowerCase() === "tarunpatidar870@gmail.com";

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const data = await login(
        formData.email,
        formData.password,
        isAdminEmail ? formData.adminPassKey : ""
      );

      if (data.role === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/user/home");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="page-title">Login</h2>

        <form className="form-grid" onSubmit={onSubmit}>
          <div className="form-row">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-row">
            <label>Password</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={onChange}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {isAdminEmail && (
            <div className="form-row">
              <label>Admin Pass Key</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type={showAdminPassKey ? "text" : "password"}
                  name="adminPassKey"
                  value={formData.adminPassKey}
                  onChange={onChange}
                  placeholder="Enter admin pass key"
                  required
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAdminPassKey((prev) => !prev)}
                >
                  {showAdminPassKey ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          )}

          {error && <p className="error-text">{error}</p>}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={{ marginTop: "16px", fontSize: "14px" }}>
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/register">Register</Link>
          </p>

          <p style={{ marginTop: "8px" }}>
            Forgot password?{" "}
            <Link to="/forgot-password">Reset here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;