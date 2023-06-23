import { regEmail } from "@/utils/regex";
import mongoose, { Document, InferSchemaType, Model, model } from "mongoose";

export type DBLoginCode = {
  email: string;
  code: string;
  updatedAt: NativeDate;
};
const loginCodeSchema = new mongoose.Schema<DBLoginCode & Document>(
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
  { versionKey: false, timestamps: true }
);

export type ILoginCode = InferSchemaType<typeof loginCodeSchema>;

const LoginCode: Model<ILoginCode> =
  mongoose.models.LoginCode || model("LoginCode", loginCodeSchema);

export { LoginCode };
