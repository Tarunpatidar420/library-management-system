import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordApi } from "../../api/authApi";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      setLoading(true);
      const data = await forgotPasswordApi({ email });
      setMessage(data.message || "Reset link sent to registered email");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="page-title">Forgot Password</h2>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Registered Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter registered email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}
          {message && <p className="success-text">{message}</p>}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPasswordPage;