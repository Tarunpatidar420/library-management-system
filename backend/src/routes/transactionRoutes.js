const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validateMiddleware");

const {
  checkBookAvailability,
  issueBook,
  returnBook,
  payFine,
  getTransactionById,
} = require("../controllers/transactionController");

const {
  bookAvailabilityValidation,
  issueBookValidation,
  returnBookValidation,
  payFineValidation,
  transactionIdValidation,
} = require("../validations/transactionValidation");

router.post(
  "/book-availability",
  protect,
  authorizeRoles("admin", "user"),
  bookAvailabilityValidation,
  validate,
  checkBookAvailability
);

router.post(
  "/issue",
  protect,
  authorizeRoles("admin", "user"),
  issueBookValidation,
  validate,
  issueBook
);

router.post(
  "/return",
  protect,
  authorizeRoles("admin", "user"),
  returnBookValidation,
  validate,
  returnBook
);

router.post(
  "/pay-fine",
  protect,
  authorizeRoles("admin", "user"),
  payFineValidation,
  validate,
  payFine
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "user"),
  transactionIdValidation,
  validate,
  getTransactionById
);

module.exports = router;