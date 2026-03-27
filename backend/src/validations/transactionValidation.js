const { body, param } = require("express-validator");

exports.bookAvailabilityValidation = [
  body("title").optional().trim(),
  body("author").optional().trim(),
];

exports.issueBookValidation = [
  body("itemId").isMongoId().withMessage("Valid item id is required"),
  body("issueDate").notEmpty().withMessage("Issue date is required"),
  body("returnDate").notEmpty().withMessage("Return date is required"),
  body("remarks").optional().trim(),
];

exports.returnBookValidation = [
  body("serialNumber").trim().notEmpty().withMessage("Serial number is required"),
  body("actualReturnDate").notEmpty().withMessage("Actual return date is required"),
  body("remarks").optional().trim(),
];

exports.payFineValidation = [
  body("transactionId").isMongoId().withMessage("Valid transaction id is required"),
  body("finePaid").isBoolean().withMessage("finePaid must be true or false"),
  body("remarks").optional().trim(),
];

exports.transactionIdValidation = [
  param("id").isMongoId().withMessage("Invalid transaction id"),
];