import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleRoute from "../components/common/RoleRoute";
import MainLayout from "../layouts/MainLayout";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import UnauthorizedPage from "../pages/auth/UnauthorizedPage";

import AdminHomePage from "../pages/admin/AdminHomePage";
import MaintenancePage from "../pages/admin/MaintenancePage";
import AddMembershipPage from "../pages/admin/AddMembershipPage";
import UpdateMembershipPage from "../pages/admin/UpdateMembershipPage";
import AddBookPage from "../pages/admin/AddBookPage";
import UpdateBookPage from "../pages/admin/UpdateBookPage";
import UserManagementPage from "../pages/admin/UserManagementPage";

import UserHomePage from "../pages/user/UserHomePage";

import ReportsHomePage from "../pages/reports/ReportsHomePage";
import MasterBooksPage from "../pages/reports/MasterBooksPage";
import MasterMoviesPage from "../pages/reports/MasterMoviesPage";
import MasterMembershipsPage from "../pages/reports/MasterMembershipsPage";
import ActiveIssuesPage from "../pages/reports/ActiveIssuesPage";
import OverdueReturnsPage from "../pages/reports/OverdueReturnsPage";
import PendingIssueRequestsPage from "../pages/reports/PendingIssueRequestsPage";

import TransactionsHomePage from "../pages/transactions/TransactionsHomePage";
import BookAvailabilityPage from "../pages/transactions/BookAvailabilityPage";
import IssueBookPage from "../pages/transactions/IssueBookPage";
import ReturnBookPage from "../pages/transactions/ReturnBookPage";
import PayFinePage from "../pages/transactions/PayFinePage";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/login" replace />} />

        <Route
          path="admin/home"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminHomePage />
            </RoleRoute>
          }
        />

        <Route
          path="admin/maintenance"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <MaintenancePage />
            </RoleRoute>
          }
        />

        <Route
          path="admin/maintenance/add-membership"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AddMembershipPage />
            </RoleRoute>
          }
        />

        <Route
          path="admin/maintenance/update-membership"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <UpdateMembershipPage />
            </RoleRoute>
          }
        />

        <Route
          path="admin/maintenance/add-book"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AddBookPage />
            </RoleRoute>
          }
        />

        <Route
          path="admin/maintenance/update-book"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <UpdateBookPage />
            </RoleRoute>
          }
        />

        <Route
          path="admin/maintenance/user-management"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <UserManagementPage />
            </RoleRoute>
          }
        />

        <Route
          path="user/home"
          element={
            <RoleRoute allowedRoles={["user"]}>
              <UserHomePage />
            </RoleRoute>
          }
        />

        <Route
          path="reports"
          element={
            <RoleRoute allowedRoles={["admin", "user"]}>
              <ReportsHomePage />
            </RoleRoute>
          }
        />

        <Route
          path="reports/books"
          element={
            <RoleRoute allowedRoles={["admin", "user"]}>
              <MasterBooksPage />
            </RoleRoute>
          }
        />

        <Route
          path="reports/movies"
          element={
            <RoleRoute allowedRoles={["admin", "user"]}>
              <MasterMoviesPage />
            </RoleRoute>
          }
        />

        <Route
          path="reports/memberships"
          element={
            <RoleRoute allowedRoles={["admin", "user"]}>
              <MasterMembershipsPage />
            </RoleRoute>
          }
        />

        <Route
          path="reports/active-issues"
          element={
            <RoleRoute allowedRoles={["admin", "user"]}>
              <ActiveIssuesPage />
            </RoleRoute>
          }
        />

        <Route
          path="reports/overdue-returns"
          element={
            <RoleRoute allowedRoles={["admin", "user"]}>
              <OverdueReturnsPage />
            </RoleRoute>
          }
        />

        <Route
          path="reports/pending-requests"
          element={
            <RoleRoute allowedRoles={["admin", "user"]}>
              <PendingIssueRequestsPage />
            </RoleRoute>
          }
        />

        <Route
          path="transactions"
          element={
            <RoleRoute allowedRoles={["admin", "user"]}>
              <TransactionsHomePage />
            </RoleRoute>
          }
        />

        <Route
          path="transactions/book-availability"
          element={
            <RoleRoute allowedRoles={["admin", "user"]}>
              <BookAvailabilityPage />
            </RoleRoute>
          }
        />

        <Route
          path="transactions/issue"
          element={
            <RoleRoute allowedRoles={["admin", "user"]}>
              <IssueBookPage />
            </RoleRoute>
          }
        />

        <Route
          path="transactions/return"
          element={
            <RoleRoute allowedRoles={["admin", "user"]}>
              <ReturnBookPage />
            </RoleRoute>
          }
        />

        <Route
          path="transactions/pay-fine"
          element={
            <RoleRoute allowedRoles={["admin", "user"]}>
              <PayFinePage />
            </RoleRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;