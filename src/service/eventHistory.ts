import { convertObjectId, dbConnect } from "@/lib/mongodb";
import { Annual } from "@/models/annual.model";
import { DBEventHistory, EventHistory } from "@/models/eventHistory.model";
import { EventModel } from "@/models/eventModel.model";
import { Member } from "@/models/member.model";
import { DateObject } from "@/utils/date";
import { regShortDate } from "@/utils/regex";

const PAGE_SIZE = 10;
export type PostEventHistory = {
  eventCode: string;
  email: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type SearchApproval = {
  id: string;
  email: string;
  name: string;
  eventCode: string;
  eventName: string;
  description: string;
  startDate: string;
  endDate: string;
  isApproval: boolean;
};
export async function getEventHistoryListPage(
  baseYear: string,
  pageNumber: number
): Promise<DBEventHistory[]> {
  const startDate = `${baseYear}-01-01`;
  const endDate = `${baseYear}-12-31`;

  await dbConnect();

  return (
    await EventHistory.find({
      startDate: { $gte: startDate, $lte: endDate },
    })
      .sort({ startDate: "desc" })
      .skip((pageNumber - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean()
  ).map(convertObjectId);
}

export async function getSearchApprovalList(
  pageNumber: number
): Promise<SearchApproval[]> {
  await dbConnect();

  const events: DBEventHistory[] = (
    await EventHistory.find({})
      .select("-createdAt -updatedAt")
      .sort({ isApproval: "asc", startDate: "desc" })
      .skip((pageNumber - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean()
  ).map(convertObjectId);

  const members = await Member.find({}).lean();
  const eventModels = await EventModel.find({}).lean();
  return events.map((e) => ({
    ...e,
    name: members.find((m) => m.email === e.email)?.name ?? "Unknown",
    eventName:
      eventModels.find((em) => em.eventCode === e.eventCode)?.name ?? "Unknown",
  }));
}
export async function addEventHistory(
  event: PostEventHistory
): Promise<string> {
  await dbConnect();
  return EventHistory.create({ ...event, isApproval: false }).then((result) => {
    return result._id.toHexString();
  });
}

export async function updateApproval(id: string, approval: boolean) {
  await dbConnect();

  try {
    const event = await EventHistory.findById(id);

    if (!event) {
      return false;
    }

    if (event.isApproval === approval) {
      return true;
    }

    const eventModel = await EventModel.findOne({
      eventCode: event.eventCode,
      isUse: true,
    });

    if (!eventModel) {
      return false;
    }

    const annual = await Annual.findOne({
      email: event.email,
      baseYear: new DateObject(event.startDate).getFullYearString(),
    });

    if (!annual) {
      return false;
    }

    const useCount =
      DateObject.getBetweenDate(event.startDate, event.endDate).length *
      eventModel.useCount;

    event.isApproval = approval;

    if (approval) {
      annual.useAnnualCount += useCount;
    } else {
      annual.useAnnualCount -= useCount;
    }
    await annual.save();
    await event.save();
    return true;
  } catch (e) {
    // ToDo 슬랙 메세지 보내기
    console.log(e);
    return false;
  }
}

export async function getUseAnnualCountOf(baseYear: string, email: string) {
  await dbConnect();

  const startDate = `${baseYear}-01-01`;
  const endDate = `${baseYear}-12-31`;

  const eventHistory = await EventHistory.find({
    email: email,
    isApproval: true,
    startDate: { $gte: startDate, $lte: endDate },
  }).lean();

  const eventModels = await EventModel.find({}).lean();

  let useCount = 0;

  eventHistory.forEach((e) => {
    const eventModel = eventModels.find((em) => em.eventCode === e.eventCode);

    const dayCount = DateObject.getBetweenDate(e.startDate, e.endDate).length;

    useCount += dayCount * (eventModel?.useCount ?? 0);
  });

  return useCount;
}
