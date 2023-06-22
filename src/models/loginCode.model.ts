import { regEmail } from "@/utils/regex";
import mongoose, { InferSchemaType, Model, model } from "mongoose";

const loginCodeSchema = new mongoose.Schema(
  {
    _id: {
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
    virtuals: {
      email: {
        get() {
          return this._id;
        },
        set(email) {
          this._id = email;
        },
      },
    },
    _id: false,
    versionKey: false,
    timestamps: true,
  }
);

export type DBLoginCode = InferSchemaType<typeof loginCodeSchema> & {
  email: string;
  updatedAt: NativeDate;
};

const LoginCode: Model<DBLoginCode> =
  mongoose.models.LoginCode || model("LoginCode", loginCodeSchema);

export { LoginCode };
