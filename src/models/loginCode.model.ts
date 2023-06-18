import { regEmail } from "@/utils/regex";
import mongoose, { ObjectId, model } from "mongoose";

type DBLoginCode = {
  _id: ObjectId;
  email: string;
  code: string;
};

const loginCodeSchema = new mongoose.Schema<Omit<DBLoginCode, "_id">>(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      match: regEmail,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const LoginCode =
  mongoose.models.LoginCode || model("LoginCode", loginCodeSchema);

export { LoginCode };
