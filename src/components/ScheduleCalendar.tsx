"use client";

import { ScheduleMap, ScheduleViewMap } from "@/service/schedule";
import { DateObject } from "@/utils/date";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { DBEventModel } from "@/models/eventModel.model";
import { ScheduleMember } from "@/service/member";
import { getCalendar } from "@/utils/calendar";
import { clientResponseHandler } from "@/utils/errro";

type Props = {
  eventModels: DBEventModel[];
  members: (ScheduleMember & { color: string })[];
  isAdmin: boolean;
};
export default function ScheduleCalendar({
  eventModels,
  members,
  isAdmin,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ScheduleViewMap>();
  const [calendar, setCalendar] = useState(getCalendar(new Date()));
  const [month, setMonth] = useState(
    new DateObject().toShortDate().slice(0, 7)
  );

  useEffect(() => {
    setCalendar(getCalendar(`${month}-01`));
    setLoading(true);
    const api = isAdmin
      ? `/api/admin/schedule/${month}`
      : `/api/client/schedule/${month}`;
    fetch(api, { method: "GET" })
      .then(clientResponseHandler)
      .then((result: ScheduleMap) => {
        const data = new Map(result);
        const keys = data.keys();
        const map: ScheduleViewMap = new Map();
        for (let key of keys) {
          const value = data.get(key);
          map.set(
            key,
            value?.map((i) => {
              const member = members.find((m) => m.email === i.email);
              return {
                eventName:
                  eventModels.find((em) => em.eventCode === i.eventCode)
                    ?.name ?? "Unknown",
                name: member?.name ?? "Unknown",
                color: member?.color ?? "black",
              };
            }) ?? []
          );
        }
        setData(map);
      })
      .finally(() => setLoading(false));
  }, [month, eventModels, members]);

  return (
    <>
      <div className="flex justify-end mt-4 ">
        <input
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          type="month"
          className=" border border-gray-300 text-l"
        />
      </div>
      <div className="flex-auto mt-4  shadow ring-1 ring-black ring-opacity-5  ">
        <div className=" grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 ">
          <div className="bg-white py-2 text-main-color">일요일</div>
          <div className="bg-white py-2">월요일</div>
          <div className="bg-white py-2">화요일</div>
          <div className="bg-white py-2">수요일</div>
          <div className="bg-white py-2">목요일</div>
          <div className="bg-white py-2">금요일</div>
          <div className="bg-white py-2 text-main-color">토요일</div>
        </div>
        {loading && <LoadingSpinner />}
        {!loading && (
          <div className="flex flex-auto bg-gray-200 text-xs leading-6 text-gray-700">
            <div className=" w-full grid grid-cols-7 grid-rows-6 gap-px">
              {data &&
                calendar.map((item) => {
                  if (!item.date) {
                    return (
                      <div
                        key={Math.random()}
                        className={`bg-gray-50 text-gray-500 relative py-2 px-3`}
                      />
                    );
                  }

                  return (
                    <div
                      key={item.date}
                      id={item.date}
                      className={`min-h-[120px] bg-white relative py-2 px-3 cursor-pointer hover:underline  ${
                        item.isWeekend ? "text-main-color" : ""
                      }`}
                    >
                      <time className="flex justify-end" dateTime={item.date}>
                        {item.date.slice(-2)}
                      </time>
                      <div>
                        {data.get(item.date)?.map((i) => (
                          <p style={{ color: i.color }} key={Math.random()}>
                            {i.name} - {i.eventName}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
