import { DBMember } from "@/types/member";
import { regEmail, regPhone } from "@/utils/regex";
import mongoose, { model } from "mongoose";

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
  enterDate: { type: String, required: true, trim: true },
  birthDay: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true, match: regPhone },
  isAdmin: { type: Boolean, required: true },
  resignDate: { type: String, required: false, default: null },
  slackUID: {
    type: String,
    required: false,
    default: null,
    trim: true,
    index: true,
    unique: true,
  },
});

memberSchema.pre("save", async function (this, next) {
  const member = await Member.findOne({ email: this.email }).exec();

  if (member) {
    return next(new Error(`${this.email}은 존재 합니다.`));
  }

  next();
});

const Member = mongoose.models.Member || model("Member", memberSchema);

export { Member };
