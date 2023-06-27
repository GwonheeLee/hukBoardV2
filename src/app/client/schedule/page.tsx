import ScheduleCalendar from "@/components/ScheduleCalendar";
import { getEventModelList } from "@/service/eventModel";
import { getMembersForSchedule } from "@/service/member";
import { getRandomColor } from "@/utils/common";

export default async function SchedulePage() {
  const eventModels = await getEventModelList();
  const members = (await getMembersForSchedule()).map((m) => ({
    ...m,
    color: getRandomColor(),
  }));

  return (
    <section className="w-full">
      <ScheduleCalendar
        eventModels={eventModels}
        members={members}
        isAdmin={false}
      />
    </section>
  );
}
