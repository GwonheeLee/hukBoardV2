"use client";
import useEventHistoryList from "@/hooks/useEventHistory";
import { SearchEventModel } from "@/service/eventModel";

export default function EventHistoryFormModal({
  eventModelList,
  close,
}: {
  eventModelList: SearchEventModel[];
  close: () => void;
}) {
  const { addEventHistory } = useEventHistoryList();
  return (
    <>
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          이벤트 등록
        </h3>
      </div>

      <div className="border-b border-gray-200 bg-white px-4  sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="eventCode"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            이벤트 종류
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <select
              name="eventCode"
              id="eventCode"
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option key="none" value="">
                선택하세요
              </option>
              {eventModelList.map((em) => (
                <option key={em.eventCode} value={em.eventCode}>
                  {em.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            사유
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="description"
              id="description"
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            시작일
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            종료일
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          addEventHistory({
            eventCode: "E00001",
            email: "gwon_hee@naver.com",
            description: "나는야",
            startDate: "2023-05-05",
            endDate: "2023-05-06",
          });
          close();
        }}
        className="mt-10  w-full !text-main-color !border-main-color justify-center"
      >
        등록
      </button>
    </>
  );
}
