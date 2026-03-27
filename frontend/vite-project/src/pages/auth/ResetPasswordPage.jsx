import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPasswordApi } from "../../api/authApi";
import {
  passwordRuleText,
  validatePassword,
} from "../../utils/passwordValidator";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeNewPassword = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordError(validatePassword(value));
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const passwordValidationMessage = validatePassword(newPassword);
    if (passwordValidationMessage) {
      setPasswordError(passwordValidationMessage);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);
      const data = await resetPasswordApi(token, { newPassword });
      setMessage(data.message || "Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(err?.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="page-title">Reset New Password</h2>

        <form className="form-grid" onSubmit={onSubmit}>
          <div className="form-row">
            <label>New Password</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={onChangeNewPassword}
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="form-row">
            <label>Confirm New Password</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
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

          {passwordError && <p className="error-text">{passwordError}</p>}
          {error && <p className="error-text">{error}</p>}
          {message && <p className="success-text">{message}</p>}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div style={{ marginTop: "16px", fontSize: "14px" }}>
          <p>
            Back to{" "}
            <Link to="/login" style={{ color: "#0f4c81", fontWeight: "700" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;