const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected")
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

module.exports = ConnectDB;
