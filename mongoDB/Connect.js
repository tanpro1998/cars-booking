import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

export { ConnectDB };
