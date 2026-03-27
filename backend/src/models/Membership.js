const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    membershipNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    memberName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    durationType: {
      type: String,
      enum: ["6_months", "1_year", "2_years"],
      default: "6_months",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", membershipSchema);