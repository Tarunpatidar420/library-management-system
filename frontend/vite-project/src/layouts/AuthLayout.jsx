import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="auth-wrapper">
      <div style={{ width: "100%", maxWidth: "460px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;