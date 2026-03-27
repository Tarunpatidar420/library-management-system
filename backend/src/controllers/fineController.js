const FineTransaction = require("../models/FineTransaction");
const IssueTransaction = require("../models/IssueTransaction");

exports.getAllFineTransactions = async (req, res) => {
  try {
    const fines = await FineTransaction.find()
      .populate("issueTransactionId")
      .sort({ createdAt: -1 });

    res.json(fines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFineByTransactionId = async (req, res) => {
  try {
    const fine = await FineTransaction.findOne({
      issueTransactionId: req.params.transactionId,
    }).populate("issueTransactionId");

    if (!fine) {
      return res.status(404).json({ message: "Fine transaction not found" });
    }

    res.json(fine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrUpdateFine = async (req, res) => {
  try {
    const { issueTransactionId, calculatedFine, finePaid, paidAmount = 0, remarks = "" } =
      req.body;

    const issueTransaction = await IssueTransaction.findById(issueTransactionId);
    if (!issueTransaction) {
      return res.status(404).json({ message: "Issue transaction not found" });
    }

    let fine = await FineTransaction.findOne({ issueTransactionId });

    if (!fine) {
      fine = await FineTransaction.create({
        issueTransactionId,
        calculatedFine,
        finePaid,
        paidAmount,
        remarks,
      });
    } else {
      fine.calculatedFine = calculatedFine ?? fine.calculatedFine;
      fine.finePaid = typeof finePaid === "boolean" ? finePaid : fine.finePaid;
      fine.paidAmount = paidAmount ?? fine.paidAmount;
      fine.remarks = remarks ?? fine.remarks;
      await fine.save();
    }

    issueTransaction.fineCalculated = fine.calculatedFine;
    issueTransaction.finePaid = fine.finePaid;
    await issueTransaction.save();

    res.json({
      message: "Fine transaction saved successfully",
      fine,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};