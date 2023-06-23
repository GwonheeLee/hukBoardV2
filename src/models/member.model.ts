import { regEmail, regPhone, regShortDate } from "@/utils/regex";
import mongoose, { Document, InferSchemaType, Model, model } from "mongoose";

export type DBMember = {
  email: string;
  name: string;
  workType: string;
  teamCode: string;
  enterDate: string;
  birthDay: string;
  phone: string;
  isAdmin: boolean;
  resignDate?: string | null;
  slackUID: string;
};
const memberSchema = new mongoose.Schema<DBMember & Document>(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      match: regEmail,
    },
    name: { type: String, required: true, trim: true },
    workType: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 6,
    },
    teamCode: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 6,
    },
    enterDate: {
      type: String,
      required: true,
      trim: true,
      match: regShortDate,
    },
    birthDay: { type: String, required: true, trim: true, match: regShortDate },
    phone: { type: String, required: true, trim: true, match: regPhone },
    isAdmin: { type: Boolean, required: true },
    resignDate: {
      type: String,
      required: false,
      default: null,
      match: regShortDate,
    },
    slackUID: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

memberSchema.pre("save", async function (this, next) {
  const member = await Member.findOne({ email: this.email }).exec();

  if (member) {
    return next(new Error(`${this.email}은 존재 합니다.`));
  }

  next();
});

export type IMember = InferSchemaType<typeof memberSchema>;

const Member: Model<IMember> =
  mongoose.models.Member || model("Member", memberSchema);

export { Member };
