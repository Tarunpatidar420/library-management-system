const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const {
  getAllFineTransactions,
  getFineByTransactionId,
  createOrUpdateFine,
} = require("../controllers/fineController");

router.get("/", protect, authorizeRoles("admin"), getAllFineTransactions);
router.get("/:transactionId", protect, authorizeRoles("admin", "user"), getFineByTransactionId);
router.post("/", protect, authorizeRoles("admin", "user"), createOrUpdateFine);

module.exports = router;