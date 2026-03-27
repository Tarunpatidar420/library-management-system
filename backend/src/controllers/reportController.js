const Item = require("../models/Item");
const Membership = require("../models/Membership");
const IssueTransaction = require("../models/IssueTransaction");
const IssueRequest = require("../models/IssueRequest");

exports.getBooksReport = async (req, res) => {
  try {
    const books = await Item.find({ itemType: "book" }).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMoviesReport = async (req, res) => {
  try {
    const movies = await Item.find({ itemType: "movie" }).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMembershipsReport = async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getActiveIssuesReport = async (req, res) => {
  try {
    const activeIssues = await IssueTransaction.find({ status: "issued" })
      .populate("userId", "name email")
      .populate("itemId");

    res.json(activeIssues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOverdueReturnsReport = async (req, res) => {
  try {
    const today = new Date();

    const overdue = await IssueTransaction.find({
      status: "issued",
      returnDate: { $lt: today },
    })
      .populate("userId", "name email")
      .populate("itemId");

    res.json(overdue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPendingRequestsReport = async (req, res) => {
  try {
    const requests = await IssueRequest.find({ status: "pending" })
      .populate("userId", "name email")
      .populate("itemId")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};