const mongoose = require("mongoose");

const fineTransactionSchema = new mongoose.Schema(
  {
    issueTransactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IssueTransaction",
      required: true,
      unique: true,
    },
    calculatedFine: {
      type: Number,
      default: 0,
      min: 0,
    },
    finePaid: {
      type: Boolean,
      default: false,
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    remarks: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FineTransaction", fineTransactionSchema);