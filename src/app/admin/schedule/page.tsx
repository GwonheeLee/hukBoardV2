import { getCalendar } from "@/utils/calendar";

export default function SchedulePage() {
  const calendar = getCalendar(new Date());
  return (
    <div className="flex-auto flex-col shadow ring-1 ring-black ring-opacity-5  ">
      <div className=" grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 ">
        <div className="bg-white py-2 text-main-color">일요일</div>
        <div className="bg-white py-2">월요일</div>
        <div className="bg-white py-2">화요일</div>
        <div className="bg-white py-2">수요일</div>
        <div className="bg-white py-2">목요일</div>
        <div className="bg-white py-2">금요일</div>
        <div className="bg-white py-2 text-main-color">토요일</div>
      </div>
      <div className="flex flex-auto bg-gray-200 text-xs leading-6 text-gray-700">
        <div className=" w-full grid grid-cols-7 grid-rows-6 gap-px">
          {calendar.map((item) => {
            if (!item.day) {
              return (
                <div
                  key={Math.random()}
                  className={`bg-gray-50 text-gray-500 relative py-2 px-3`}
                />
              );
            }

            return (
              <div
                key={item.day}
                className={`min-h-[120px] bg-white relative py-2 px-3 cursor-pointer hover:underline  ${
                  item.isWeekend ? "text-main-color" : ""
                }`}
              >
                <time dateTime={item.day}>{item.day}</time>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
