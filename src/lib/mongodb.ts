import mongoose from "mongoose";
import { config } from "./config";

export async function dbConnect() {
  mongoose.set("strictQuery", true);
  return await mongoose.connect(config.mongodb.uri, {
    maxPoolSize: 30,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 15000,
  });
}
