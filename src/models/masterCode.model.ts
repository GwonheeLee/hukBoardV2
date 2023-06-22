import mongoose, { Document, InferSchemaType, Model, model } from "mongoose";

export type DBMasterCode = {
  code: string;
  masterCode: string;
  description: string;
  codeValue: string;
  codeSubValue: string;
  isUse: boolean;
};

const masterCodeSchema = new mongoose.Schema<DBMasterCode & Document>(
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
      index: true,
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

export type IMasterCode = InferSchemaType<typeof masterCodeSchema>;

const MasterCode: Model<IMasterCode> =
  mongoose.models.MasterCode || model("MasterCode", masterCodeSchema);

export { MasterCode };
