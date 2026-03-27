const { body, param } = require("express-validator");

exports.createMembershipValidation = [
  body("membershipNumber").trim().notEmpty().withMessage("Membership number is required"),
  body("memberName").trim().notEmpty().withMessage("Member name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("address").trim().notEmpty().withMessage("Address is required"),
  body("durationType")
    .isIn(["6_months", "1_year", "2_years"])
    .withMessage("Invalid duration type"),
  body("startDate").notEmpty().withMessage("Start date is required"),
];

exports.membershipNumberValidation = [
  param("membershipNumber").trim().notEmpty().withMessage("Membership number is required"),
];