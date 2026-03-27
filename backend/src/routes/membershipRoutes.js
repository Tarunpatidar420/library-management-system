const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validateMiddleware");

const {
  createMembership,
  getMemberships,
  getMembershipByNumber,
  updateMembership,
  extendMembership,
  cancelMembership,
} = require("../controllers/membershipController");

const {
  createMembershipValidation,
  membershipNumberValidation,
} = require("../validations/membershipValidation");

router.get("/", protect, getMemberships);
router.get(
  "/:membershipNumber",
  protect,
  membershipNumberValidation,
  validate,
  getMembershipByNumber
);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createMembershipValidation,
  validate,
  createMembership
);

router.put(
  "/:membershipNumber",
  protect,
  authorizeRoles("admin"),
  membershipNumberValidation,
  validate,
  updateMembership
);

router.patch(
  "/:membershipNumber/extend",
  protect,
  authorizeRoles("admin"),
  membershipNumberValidation,
  validate,
  extendMembership
);

router.patch(
  "/:membershipNumber/cancel",
  protect,
  authorizeRoles("admin"),
  membershipNumberValidation,
  validate,
  cancelMembership
);

module.exports = router;