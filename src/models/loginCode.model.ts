import { regEmail } from "@/utils/regex";
import mongoose, { InferSchemaType, Model, model } from "mongoose";

const loginCodeSchema = new mongoose.Schema(
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

loginCodeSchema.set("toJSON", { getters: true });
loginCodeSchema.set("toObject", { getters: true });
const LoginCode: Model<DBLoginCode> =
  mongoose.models.LoginCode || model("LoginCode", loginCodeSchema);

export type DBLoginCode = InferSchemaType<typeof loginCodeSchema>;

export { LoginCode };
