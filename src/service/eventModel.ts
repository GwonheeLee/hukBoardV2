import { dbConnect } from "@/lib/mongodb";
import {
  DBEventModel,
  EventModel,
  SearchEventModel,
} from "@/models/eventModel.model";

export async function getEventModelList(): Promise<SearchEventModel[]> {
  await dbConnect();
  return EventModel.find().select("-_id eventCode name isUse").lean();
}

export async function getEventModel(eventCode: string) {
  await dbConnect();

  return EventModel.findOne({ eventCode })
    .select("-_id")
    .lean<Omit<DBEventModel, "_id">>();
}
