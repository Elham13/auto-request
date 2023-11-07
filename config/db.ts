import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error("Could not find the MONGO_URI from env");
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected at ${conn.connection.host}`);
  } catch (error: any) {
    console.log("DB Error: ", error.message);
    process.exit(0);
  }
};

export default connectDb;
