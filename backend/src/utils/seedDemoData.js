const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Item = require("../models/Item");
const Membership = require("../models/Membership");
const IssueTransaction = require("../models/IssueTransaction");

const seedDemoData = async () => {
  try {
    // =========================
    // 1. ADMIN
    // =========================
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      const hashedPassword = await bcrypt.hash("Tarun@2805", 10);

      adminUser = await User.create({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        isActive: true,
      });

      console.log("✅ Admin created");
    }

    // =========================
    // 2. USERS
    // =========================
    const dummyUsers = [
      {
        name: "Ramu Sharma",
        email: "ramu@gmail.com",
        password: "Ramu@1234",
        role: "user",
      },
      {
        name: "Shamu Verma",
        email: "shamu@gmail.com",
        password: "Shamu@1234",
        role: "user",
      },
    ];

    const createdUsers = [];

    for (const u of dummyUsers) {
      let existingUser = await User.findOne({ email: u.email.toLowerCase() });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(u.password, 10);

        existingUser = await User.create({
          name: u.name,
          email: u.email.toLowerCase(),
          password: hashedPassword,
          role: u.role,
          isActive: true,
        });
      }

      createdUsers.push(existingUser);
    }

    console.log("✅ Dummy users ready");

    // =========================
    // 3. BOOKS + MOVIES / ITEMS
    // =========================
    const dummyItems = [
      // BOOKS
      {
        title: "Math",
        author: "NCERT",
        category: "Education",
        serialNumber: "BOOK001",
        itemType: "book",
        isAvailable: true,
        status: "active",
      },
      {
        title: "Physics",
        author: "NCERT",
        category: "Science",
        serialNumber: "BOOK002",
        itemType: "book",
        isAvailable: true,
        status: "active",
      },

      // MOVIES
      {
        title: "3 Idiots",
        author: "Rajkumar Hirani",
        category: "Drama",
        serialNumber: "MOV001",
        itemType: "movie",
        isAvailable: true,
        status: "active",
      },
      {
        title: "Dangal",
        author: "Nitesh Tiwari",
        category: "Sports",
        serialNumber: "MOV002",
        itemType: "movie",
        isAvailable: true,
        status: "active",
      },
    ];

    const createdItems = [];

    for (const item of dummyItems) {
      let existingItem = await Item.findOne({ serialNumber: item.serialNumber });

      if (!existingItem) {
        existingItem = await Item.create(item);
      }

      createdItems.push(existingItem);
    }

    console.log("✅ Dummy books + movies ready");

    // =========================
    // 4. MEMBERSHIPS
    // =========================
    const dummyMemberships = [
      {
        membershipNumber: "MEM001",
        memberName: "Ramu Sharma",
        email: "ramu@gmail.com",
        phone: "9876543210",
        address: "Indore",
        durationType: "6_months",
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-07-01"),
        status: "active",
      },
      {
        membershipNumber: "MEM002",
        memberName: "Shamu Verma",
        email: "shamu@gmail.com",
        phone: "9876543211",
        address: "Bhopal",
        durationType: "1_year",
        startDate: new Date("2026-01-01"),
        endDate: new Date("2027-01-01"),
        status: "active",
      },
    ];

    for (const membership of dummyMemberships) {
      const exists = await Membership.findOne({
        membershipNumber: membership.membershipNumber,
      });

      if (!exists) {
        await Membership.create(membership);
      }
    }

    console.log("✅ Dummy memberships ready");

    // =========================
    // 5. ISSUE TRANSACTIONS
    // =========================
    const ramu = createdUsers.find((u) => u.email === "ramu@gmail.com");
    const shamu = createdUsers.find((u) => u.email === "shamu@gmail.com");

    const mathBook = createdItems.find((i) => i.serialNumber === "BOOK001");
    const physicsBook = createdItems.find((i) => i.serialNumber === "BOOK002");

    if (ramu && mathBook) {
      const txn1Exists = await IssueTransaction.findOne({
        userId: ramu._id,
        serialNumber: "BOOK001",
      });

      if (!txn1Exists) {
        await IssueTransaction.create({
          itemId: mathBook._id,
          userId: ramu._id,
          bookName: "Math",
          author: "NCERT",
          serialNumber: "BOOK001",
          issueDate: new Date("2026-03-01"),
          returnDate: new Date("2026-03-10"),
          actualReturnDate: null,
          remarks: "Demo transaction",
          fineCalculated: 0,
          finePaid: false,
          status: "issued",
        });
      }
    }

    if (shamu && physicsBook) {
      const txn2Exists = await IssueTransaction.findOne({
        userId: shamu._id,
        serialNumber: "BOOK002",
      });

      if (!txn2Exists) {
        await IssueTransaction.create({
          itemId: physicsBook._id,
          userId: shamu._id,
          bookName: "Physics",
          author: "NCERT",
          serialNumber: "BOOK002",
          issueDate: new Date("2026-03-02"),
          returnDate: new Date("2026-03-12"),
          actualReturnDate: null,
          remarks: "Demo transaction",
          fineCalculated: 0,
          finePaid: false,
          status: "issued",
        });
      }
    }

    console.log("✅ Dummy transactions ready");
  } catch (error) {
    console.log("❌ Seed demo data error:", error.message);
  }
};

module.exports = seedDemoData;