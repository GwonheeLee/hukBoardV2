import { dbConnect } from "@/lib/mongodb";
import { EventModel } from "@/models/eventModel.model";

export type SearchEventModel = {
  eventCode: string;
  name: string;
  isUse: boolean;
};

export async function getEventModelList() {
  await dbConnect();
  return EventModel.find({})
    .select("eventCode name isUse -_id")
    .sort({ eventCode: "asc" })
    .lean();
}

export async function getEventModel(eventCode: string) {
  await dbConnect();

  return EventModel.findOne({ eventCode })
    .select("-_id -createdAt -updatedAt")
    .lean();
}
