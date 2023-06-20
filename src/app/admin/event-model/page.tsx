import EventModelList from "@/components/EventModelList";
import { getEventModelList } from "@/service/eventModel";

export default async function EventModelPage() {
  const eventModelList = await getEventModelList();

  return (
    <section className="w-full">
      <EventModelList eventModelList={eventModelList} />
    </section>
  );
}
