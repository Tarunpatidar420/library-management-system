const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validateMiddleware");

const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  searchItems,
} = require("../controllers/itemController");

const {
  createItemValidation,
  itemIdValidation,
  searchItemValidation,
} = require("../validations/itemValidation");

router.get("/", protect, getItems);
router.get("/search", protect, searchItemValidation, validate, searchItems);
router.get("/:id", protect, itemIdValidation, validate, getItemById);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createItemValidation,
  validate,
  createItem
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  itemIdValidation,
  validate,
  updateItem
);

module.exports = router;