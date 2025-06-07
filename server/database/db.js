import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MongoUrl = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MONGODB CONNECTED");
  } catch (error) {
    console.log("error in Connection", error);
  }
};

export default connectDB;
