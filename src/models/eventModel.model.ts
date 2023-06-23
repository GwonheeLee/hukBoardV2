import mongoose, { InferSchemaType, Model, model } from "mongoose";

export type DBEventModel = {
  eventCode: string;
  name: string;
  useCount: number;
  isNeedApproval: boolean;
  isMonthOnce: boolean;
  isUse: boolean;
};

const eventModelSchema = new mongoose.Schema<Omit<DBEventModel, "_id">>(
  {
    eventCode: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      minlength: 6,
      maxlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    useCount: {
      type: Number,
      required: true,
    },
    isNeedApproval: {
      type: Boolean,
      required: true,
    },
    isMonthOnce: {
      type: Boolean,
      required: true,
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

eventModelSchema.pre("save", async function (this, next) {
  const eventModel = await EventModel.findOne({ email: this.eventCode }).exec();

  if (eventModel) {
    return next(new Error(`${this.eventCode}은 존재 합니다.`));
  }

  next();
});

export type IEventModel = InferSchemaType<typeof eventModelSchema>;

const EventModel: Model<IEventModel> =
  mongoose.models.EventModel || model("EventModel", eventModelSchema);

export { EventModel };
