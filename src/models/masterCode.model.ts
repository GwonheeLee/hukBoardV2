import mongoose, { ObjectId, model } from "mongoose";

export type DBMasterCode = {
  _id: ObjectId;
  code: string;
  masterCode: string;
  description: string;
  codeValue: string;
  codeSubValue: string;
  isUse: boolean;
};

export type MasterCodeT = Omit<DBMasterCode, "_id" | "isUse">;

const masterCodeSchema = new mongoose.Schema<Omit<DBMasterCode, "_id">>(
  {
    code: {
      type: String,
      minlength: 6,
      maxlength: 6,
      required: true,
      trim: true,
      index: true,
      unique: true,
    },
    masterCode: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 3,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    codeValue: {
      type: String,
      required: true,
      trim: true,
    },
    codeSubValue: {
      type: String,
      default: "",
    },
    isUse: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const MasterCode =
  mongoose.models.MasterCode || model("MasterCode", masterCodeSchema);

export { MasterCode };
