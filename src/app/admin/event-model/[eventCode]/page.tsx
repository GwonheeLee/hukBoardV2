import EventModelForm from "@/components/EventModelForm";
import { getEventModel } from "@/service/eventModel";

type Props = {
  params: {
    eventCode: string;
  };
};
export default async function EventModelDetailPage({
  params: { eventCode },
}: Props) {
  let eventModel;
  let isNew = false;
  if (eventCode === "new") {
    eventModel = {
      eventCode: "",
      name: "",
      useCount: 0,
      isNeedApproval: true,
      isMonthOnce: false,
      isUse: true,
    };
    isNew = true;
  } else {
    eventModel = await getEventModel(eventCode);
  }
  if (!eventModel) {
    return <h1>해당 이벤트모델은 없습니다</h1>;
  }
  return (
    <section className="w-full m-2 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
      <EventModelForm eventModel={eventModel} isNew={isNew} />
    </section>
  );
}
