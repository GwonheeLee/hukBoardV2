import { regEmail } from "@/utils/regex";
import mongoose, { ObjectId } from "mongoose";
export type DBMember = {
  _id: ObjectId;
  email: string;
  name: string;
  workType: string;
  enterDate: string;
  b;
};

const memberSchema = new mongoose.Schema<Omit<DBMember, "_id">>({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true,
    match: regEmail,
  },
  name: { type: String, required: true, trim: true },
  workType: { type: String, required: true, trim: true },
  enterDate: { type: Date, required: true, trim: true },
  birthDay: { type: Date, required: true, trim: true },
  phone: { type: String, required: true, trim: true, match: regPhone },
  isAdmin: { type: Boolean, required: true },
  resignDate: { type: Date, required: false, default: null },
  slackUID: {
    type: String,
    required: false,
    default: null,
    trim: true,
    index: true,
    unique: true,
  },
});
