import mongoose from "mongoose";

declare global {
  var db: typeof mongoose;
}
