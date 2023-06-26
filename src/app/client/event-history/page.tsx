import EventHistoryList from "@/components/EventHistoryList";
import { getEventModelList } from "@/service/eventModel";

export const dynamic = "force-dynamic";
export default async function EvnetHistoryPage() {
  const eventModelList = await getEventModelList();

  return (
    <section className="w-full">
      <EventHistoryList eventModelList={eventModelList} />
    </section>
  );
}
