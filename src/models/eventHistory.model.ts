import { regEmail, regShortDate } from "@/utils/regex";
import mongoose, { Document, InferSchemaType, Model, model } from "mongoose";
import { Member } from "./member.model";
import { EventModel } from "./eventModel.model";

export type DBEventHistory = {
  id: string;
  eventCode: string;
  email: string;
  description: string;
  startDate: string;
  endDate: string;
  isApproval: boolean;
};

const eventHistorySchema = new mongoose.Schema<DBEventHistory & Document>(
  {
    eventCode: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 6,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: regEmail,
    },
    description: {
      type: String,
      required: true,
      default: "",
      trim: true,
    },
    startDate: {
      type: String,
      required: true,
      trim: true,
      match: regShortDate,
    },
    endDate: {
      type: String,
      required: true,
      trim: true,
      match: regShortDate,
    },
    isApproval: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
eventHistorySchema.index({ startDate: "desc" });
eventHistorySchema.index({ endDate: "desc" });
eventHistorySchema.pre("save", async function (this, next) {
  const member = await Member.findOne({ email: this.email });

  if (!member) {
    return next(new Error(`${this.email}에 해당하는 사원은 없습니다.`));
  }

  const eventModel = await EventModel.findOne({
    eventCode: this.eventCode,
    isUse: true,
  });

  if (!eventModel) {
    return next(
      new Error(`${this.eventCode}에 해당하는 이벤트 모델은 없습니다.`)
    );
  }

  next();
});
export type IEvnetHistory = InferSchemaType<typeof eventHistorySchema>;

const EventHistory: Model<IEvnetHistory> =
  mongoose.models.EventHistory || model("EventHistory", eventHistorySchema);

export { EventHistory };
