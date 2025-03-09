// require("dotenv").config(); // at the top
import "dotenv/config"; // Load environment variables
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // const connectionInstance = await mongoose.connect(
    //   `${process.env.MONGO_URI}/${process.env.DB_NAME}`
    // );
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGO connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
