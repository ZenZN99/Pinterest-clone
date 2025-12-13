import mongoose from "mongoose";

export async function connectDB() {
  try {
    const url = process.env.DATABASE_URL as string;
    await mongoose.connect(url);
    console.log("Database Connected");
  } catch (error) {
    console.log("Database Fail ", error);
  }
}
