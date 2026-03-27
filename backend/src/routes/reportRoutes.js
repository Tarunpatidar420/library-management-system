const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const {
  getBooksReport,
  getMoviesReport,
  getMembershipsReport,
  getActiveIssuesReport,
  getOverdueReturnsReport,
  getPendingRequestsReport,
} = require("../controllers/reportController");

router.get("/books", protect, authorizeRoles("admin", "user"), getBooksReport);
router.get("/movies", protect, authorizeRoles("admin", "user"), getMoviesReport);
router.get("/memberships", protect, authorizeRoles("admin", "user"), getMembershipsReport);
router.get("/active-issues", protect, authorizeRoles("admin", "user"), getActiveIssuesReport);
router.get("/overdue-returns", protect, authorizeRoles("admin", "user"), getOverdueReturnsReport);
router.get("/pending-requests", protect, authorizeRoles("admin", "user"), getPendingRequestsReport);

module.exports = router;