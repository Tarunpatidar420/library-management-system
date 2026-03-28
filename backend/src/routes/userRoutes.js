const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  toggleUserStatus,
  getUserHistory,
  deleteUser,
} = require("../controllers/userController");

router.post("/", protect, authorizeRoles("admin"), createUser);
router.get("/", protect, authorizeRoles("admin"), getUsers);
router.get("/:id/history", protect, authorizeRoles("admin"), getUserHistory);
router.get("/:id", protect, authorizeRoles("admin"), getUserById);
router.put("/:id", protect, authorizeRoles("admin"), updateUser);
router.patch("/:id/status", protect, authorizeRoles("admin"), toggleUserStatus);
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

module.exports = router;