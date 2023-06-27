import { dbConnect } from "@/lib/mongodb";
import { EventHistory } from "@/models/eventHistory.model";
import { Member } from "@/models/member.model";
import { DateObject } from "@/utils/date";

export type Schedule = {
  email: string;
  date: string;
  eventCode: string;
};

export type ScheduleMap = Map<string, { email: string; eventCode: string }[]>;
export type ScheduleViewMap = Map<
  string,
  { name: string; eventName: string; color: string }[]
>;
export async function getSchedule(date: string, teamCode?: string) {
  await dbConnect();

  const base = new DateObject(`${date}-01`);
  const baseMonth = date.slice(-2);
  const startDate = base.toShortDate();
  const endDate = base.setLastDate().toShortDate();

  let teamMembers: string[];

  let query: any = {
    $and: [
      {
        $or: [
          { startDate: { $gte: startDate, $lte: endDate } },
          { endDate: { $gte: startDate, $lte: endDate } },
        ],
      },
      { isApproval: true },
    ],
  };

  if (teamCode) {
    teamMembers = (await Member.find({ teamCode }).select("email").lean()).map(
      (m) => m.email
    );
    query = {
      $and: [
        {
          $or: [
            { startDate: { $gte: startDate, $lte: endDate } },
            { endDate: { $gte: startDate, $lte: endDate } },
          ],
        },
        { isApproval: true },
        { email: { $in: teamMembers } },
      ],
    };
  }

  const eventHistoryList = await EventHistory.find(query).lean();

  const datas: Schedule[] = [];

  eventHistoryList.forEach((eh) => {
    const list = DateObject.getBetweenDate(eh.startDate, eh.endDate).map(
      (date) => ({ email: eh.email, eventCode: eh.eventCode, date })
    );

    datas.push(...list.filter((i) => i.date.slice(5, 7) === baseMonth));
  });

  const map: ScheduleMap = new Map();

  datas.forEach((i) => {
    const value = map.get(i.date);

    if (value) {
      value.push({ email: i.email, eventCode: i.eventCode });
    } else {
      map.set(i.date, [{ email: i.email, eventCode: i.eventCode }]);
    }
  });

  return map;
}
