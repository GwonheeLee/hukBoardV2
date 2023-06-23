"use client";
import { DBEventModel } from "@/models/eventModel.model";
import { RadioGroup } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  eventModel: DBEventModel;
  isNew: boolean;
};

export default function EventModelForm({ eventModel, isNew }: Props) {
  const router = useRouter();
  const [eventModelData, setEventModelData] = useState(eventModel);
  const [loading, setLoading] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEventModelData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!eventModelData.eventCode || eventModelData.eventCode.length !== 6) {
      window.alert("이벤트 코드 형식이 맞지 않습니다. ");
      return;
    }

    if (!eventModelData.name) {
      window.alert("이벤트 명은 필수 값 입니다.");
      return;
    }

    if (!eventModelData.useCount) {
      window.alert("연차 사용량은 필수 값 입니다.");
      return;
    }

    setLoading(true);

    fetch("/api/admin/event-model", {
      method: isNew ? "POST" : "PUT",
      body: JSON.stringify(eventModelData),
    })
      .then(async (res) => {
        if (!res.ok) {
          window.alert(`${res.status} ${await res.text()}`);
          return;
        }
        window.alert("성공");
        router.replace("/admin/event-model");
      })

      .catch((err) => {
        window.alert(err.toString());
      })

      .finally(() => setLoading(false));
  };
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-4 space-y-12 sm:space-y-16">
        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="eventCode"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              이벤트 코드
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="eventCode"
                id="eventCode"
                readOnly={!isNew}
                value={eventModelData.eventCode}
                onChange={handleInput}
                className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              이벤트 명
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="name"
                id="name"
                value={eventModelData.name}
                onChange={handleInput}
                className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="useCount"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              연차 사용량
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="useCount"
                id="useCount"
                value={eventModelData.useCount}
                onChange={handleInput}
                className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <RadioGroup
            value={eventModelData.isNeedApproval}
            onChange={(e) => {
              setEventModelData((prev) => ({ ...prev, isNeedApproval: e }));
            }}
            className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
          >
            <RadioGroup.Label className=" block text-sm font-medium leading-6 text-gray-900">
              승인 여부
            </RadioGroup.Label>
            <RadioGroup.Option value={true}>
              {({ checked }) => (
                <label className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4  rounded-full border border-gray-300 ${
                      checked ? "bg-main-color" : "bg-white"
                    }`}
                  ></div>
                  <span className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                    승인 필수
                  </span>
                </label>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value={false}>
              {({ checked }) => (
                <label className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4  rounded-full border border-gray-300 ${
                      checked ? "bg-main-color" : "bg-white"
                    }`}
                  ></div>
                  <span className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                    승인 불필요
                  </span>
                </label>
              )}
            </RadioGroup.Option>
          </RadioGroup>

          <RadioGroup
            value={eventModelData.isMonthOnce}
            onChange={(e) => {
              setEventModelData((prev) => ({ ...prev, isMonthOnce: e }));
            }}
            className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
          >
            <RadioGroup.Label className=" block text-sm font-medium leading-6 text-gray-900">
              월 1회
            </RadioGroup.Label>
            <RadioGroup.Option value={true}>
              {({ checked }) => (
                <label className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4  rounded-full border border-gray-300 ${
                      checked ? "bg-main-color" : "bg-white"
                    }`}
                  ></div>
                  <span className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                    월 1회
                  </span>
                </label>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value={false}>
              {({ checked }) => (
                <label className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4  rounded-full border border-gray-300 ${
                      checked ? "bg-main-color" : "bg-white"
                    }`}
                  ></div>
                  <span className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                    자유
                  </span>
                </label>
              )}
            </RadioGroup.Option>
          </RadioGroup>

          <RadioGroup
            value={eventModelData.isUse}
            onChange={(e) => {
              setEventModelData((prev) => ({ ...prev, isUse: e }));
            }}
            className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
          >
            <RadioGroup.Label className=" block text-sm font-medium leading-6 text-gray-900">
              사용 여부
            </RadioGroup.Label>
            <RadioGroup.Option value={true}>
              {({ checked }) => (
                <label className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4  rounded-full border border-gray-300 ${
                      checked ? "bg-main-color" : "bg-white"
                    }`}
                  ></div>
                  <span className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                    사용
                  </span>
                </label>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value={false}>
              {({ checked }) => (
                <label className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4  rounded-full border border-gray-300 ${
                      checked ? "bg-main-color" : "bg-white"
                    }`}
                  ></div>
                  <span className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                    미사용
                  </span>
                </label>
              )}
            </RadioGroup.Option>
          </RadioGroup>
          {
            //
          }
        </div>
      </div>

      <div className="m-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => router.push("/admin/event-model")}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
