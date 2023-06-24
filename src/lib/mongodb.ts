import mongoose, { Types } from "mongoose";
import { config } from "./config";

export async function dbConnect() {
  if (!global.db) {
    mongoose.set("strictQuery", true);
    global.db = await mongoose.connect(config.mongodb.uri, {
      maxPoolSize: 30,
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 30000,
    });
  }
  return global.db;
}

export function convertObjectId(item: any) {
  item.id = item._id.toHexString();
  delete item._id;

  return item;
}
