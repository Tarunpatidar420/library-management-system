const Item = require("../models/Item");
const IssueTransaction = require("../models/IssueTransaction");
const calculateFine = require("../utils/fineCalculator");
const { addDays, startOfToday } = require("../utils/dateUtils");

exports.checkBookAvailability = async (req, res) => {
  try {
    const { title, author } = req.body;

    if (!title && !author) {
      return res.status(400).json({
        message: "At least one of book name or author is required",
      });
    }

    const query = {
      itemType: "book",
      status: "active",
    };

    if (title) query.title = { $regex: title, $options: "i" };
    if (author) query.author = { $regex: author, $options: "i" };

    const books = await Item.find(query);

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.issueBook = async (req, res) => {
  try {
    const { itemId, issueDate, returnDate, remarks = "" } = req.body;

    if (!itemId || !issueDate || !returnDate) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Book not found" });

    if (!item.isAvailable) {
      return res.status(400).json({ message: "Book is not available" });
    }

    const today = startOfToday();
    const issue = startOfToday(issueDate);
    const ret = startOfToday(returnDate);
    const maxReturn = addDays(issue, 15);

    if (issue < today) {
      return res.status(400).json({ message: "Issue date cannot be less than today" });
    }

    if (ret < issue) {
      return res.status(400).json({
        message: "Return date cannot be less than issue date",
      });
    }

    if (ret > maxReturn) {
      return res.status(400).json({
        message: "Return date cannot be greater than 15 days from issue date",
      });
    }

    const transaction = await IssueTransaction.create({
      itemId: item._id,
      userId: req.user.id,
      bookName: item.title,
      author: item.author,
      serialNumber: item.serialNumber,
      issueDate: issue,
      returnDate: ret,
      remarks,
    });

    item.isAvailable = false;
    await item.save();

    res.status(201).json({
      message: "Book issued successfully",
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { serialNumber, actualReturnDate, remarks = "" } = req.body;

    if (!serialNumber || !actualReturnDate) {
      return res.status(400).json({
        message: "Serial number and actual return date are required",
      });
    }

    const transaction = await IssueTransaction.findOne({
      serialNumber,
      status: "issued",
    });

    if (!transaction) {
      return res.status(404).json({ message: "Issued transaction not found" });
    }

    const actual = new Date(actualReturnDate);
    const finePerDay = Number(process.env.FINE_PER_DAY || 10);
    const fine = calculateFine(transaction.returnDate, actual, finePerDay);

    transaction.actualReturnDate = actual;
    transaction.fineCalculated = fine;
    transaction.remarks = remarks;

    await transaction.save();

    res.json({
      message: "Return processed. Redirect to Pay Fine page.",
      transactionId: transaction._id,
      fineCalculated: fine,
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.payFine = async (req, res) => {
  try {
    const { transactionId, finePaid, remarks = "" } = req.body;

    const transaction = await IssueTransaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.status === "returned") {
      return res.status(400).json({ message: "Book already returned" });
    }

    if (transaction.fineCalculated > 0 && finePaid !== true) {
      return res.status(400).json({
        message: "Fine must be paid before completing return",
      });
    }

    transaction.finePaid = transaction.fineCalculated > 0 ? true : false;
    transaction.status = "returned";
    transaction.remarks = remarks || transaction.remarks;

    await transaction.save();

    const item = await Item.findById(transaction.itemId);
    if (item) {
      item.isAvailable = true;
      await item.save();
    }

    res.json({
      message: "Book return completed successfully",
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await IssueTransaction.findById(req.params.id)
      .populate("itemId")
      .populate("userId", "name email role");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};