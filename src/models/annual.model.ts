import mongoose, { model, ObjectId } from "mongoose";

export type DBAnnual = {
  _id: ObjectId;
  baseYear: string;
  email: string;
  name: string;
  annualCount: number;
  useAnnualCount: number;
  prevUseAnnualCount: number;
};

const annualSchema = new mongoose.Schema<DBAnnual>(
  {
    baseYear: { type: String, required: true, index: true },
    email: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    annualCount: { type: Number, required: true, default: 0 },
    useAnnualCount: { type: Number, required: true, default: 0 },
    prevUseAnnualCount: { type: Number, required: true, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
annualSchema.index({ email: 1, baseYear: 1 }, { unique: true });

annualSchema.pre("save", async function (this, next) {
  const annual = await Annual.findOne({
    email: this.email,
    baseYear: this.baseYear,
  }).exec();

  if (annual) {
    return next(new Error(`${this.baseYear}년도 연차는 이미 존재 합니다.`));
  }

  next();
});

const Annual = mongoose.models.Annual || model("Annual", annualSchema);

export { Annual };
