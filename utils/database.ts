import mongoose from "mongoose";

let isConnected = false;

export default async function connectToDB() {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "share_prompt",
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
}