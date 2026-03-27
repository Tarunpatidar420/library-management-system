const { body, param, query } = require("express-validator");

exports.createItemValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("author").trim().notEmpty().withMessage("Author is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("serialNumber").trim().notEmpty().withMessage("Serial number is required"),
  body("itemType")
    .optional()
    .isIn(["book", "movie"])
    .withMessage("Item type must be book or movie"),
];

exports.itemIdValidation = [
  param("id").isMongoId().withMessage("Invalid item id"),
];

exports.searchItemValidation = [
  query("title").optional().trim(),
  query("author").optional().trim(),
];