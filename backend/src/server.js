require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const seedDemoData = require("./utils/seedDemoData");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDemoData();

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Server start error:", error.message);
    process.exit(1);
  }
};

startServer();
