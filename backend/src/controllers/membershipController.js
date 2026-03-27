const Membership = require("../models/Membership");
const { addDays } = require("../utils/dateUtils");

exports.createMembership = async (req, res) => {
  try {
    const {
      membershipNumber,
      memberName,
      email,
      phone,
      address,
      durationType,
      startDate,
    } = req.body;

    const exists = await Membership.findOne({ membershipNumber });
    if (exists) {
      return res.status(400).json({ message: "Membership number already exists" });
    }

    const start = new Date(startDate);
    let end = new Date(start);

    if (durationType === "6_months") end.setMonth(end.getMonth() + 6);
    if (durationType === "1_year") end.setFullYear(end.getFullYear() + 1);
    if (durationType === "2_years") end.setFullYear(end.getFullYear() + 2);

    const membership = await Membership.create({
      membershipNumber,
      memberName,
      email,
      phone,
      address,
      durationType,
      startDate: start,
      endDate: end,
    });

    res.status(201).json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMembershipByNumber = async (req, res) => {
  try {
    const membership = await Membership.findOne({
      membershipNumber: req.params.membershipNumber,
    });

    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMembership = async (req, res) => {
  try {
    const membership = await Membership.findOneAndUpdate(
      { membershipNumber: req.params.membershipNumber },
      req.body,
      { new: true, runValidators: true }
    );

    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.extendMembership = async (req, res) => {
  try {
    const { extensionType = "6_months" } = req.body;

    const membership = await Membership.findOne({
      membershipNumber: req.params.membershipNumber,
    });

    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    let end = new Date(membership.endDate);

    if (extensionType === "6_months") end.setMonth(end.getMonth() + 6);
    if (extensionType === "1_year") end.setFullYear(end.getFullYear() + 1);
    if (extensionType === "2_years") end.setFullYear(end.getFullYear() + 2);

    membership.endDate = end;
    membership.status = "active";
    await membership.save();

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelMembership = async (req, res) => {
  try {
    const membership = await Membership.findOne({
      membershipNumber: req.params.membershipNumber,
    });

    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    membership.status = "cancelled";
    await membership.save();

    res.json({ message: "Membership cancelled", membership });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};