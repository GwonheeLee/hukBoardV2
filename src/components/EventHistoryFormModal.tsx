"use client";
import useEventHistoryList from "@/hooks/useEventHistory";
import { SearchEventModel } from "@/service/eventModel";
import { DateObject } from "@/utils/date";
import { ChangeEvent, useState } from "react";

export default function EventHistoryFormModal({
  eventModelList,
  close,
}: {
  eventModelList: SearchEventModel[];
  close: () => void;
}) {
  const { addEventHistory } = useEventHistoryList();
  const [dataForm, setDataForm] = useState({
    eventCode: "",
    description: "",
    startDate: new DateObject().toShortDate(),
    endDate: new DateObject().toShortDate(),
  });

  const handleClick = () => {
    if (!dataForm.eventCode) {
      window.alert("이벤트 종류를 선택 해주세요.");
      return;
    }
    if (!dataForm.description) {
      window.alert("사유를 작성 해주세요");
      return;
    }
    addEventHistory(dataForm);
    close();
  };

  const handleInputSelectBoxChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDataForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "startDate":
        if (!!dataForm.endDate && dataForm.endDate < e.target.value) {
          window.alert("시작일이 종료일 보다 클 수는 없습니다.");
          return;
        }
        setDataForm((prev) => ({ ...prev, ["startDate"]: e.target.value }));
        break;
      case "endDate":
        if (!!dataForm.startDate && dataForm.startDate > e.target.value) {
          window.alert("종료일이 시작일 보다 클 수는 없습니다.");
          return;
        }
        setDataForm((prev) => ({ ...prev, ["endDate"]: e.target.value }));
        break;
      default:
        throw new Error("Date Input의 Name이 잘못 되었습니다.");
    }
  };
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
              value={dataForm.eventCode}
              onChange={handleInputSelectBoxChange}
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
              value={dataForm.description}
              onChange={handleInputSelectBoxChange}
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
              value={dataForm.startDate}
              onChange={handleDateChange}
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
              value={dataForm.endDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleClick}
        className="mt-10  w-full !text-main-color !border-main-color justify-center"
      >
        등록
      </button>
    </>
  );
}
