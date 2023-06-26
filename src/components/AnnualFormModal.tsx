"use client";
import { ChangeEvent, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import useAnnual from "@/hooks/useAnnual";
import { SearchAnnual } from "@/service/annual";

type Props = {
  annual: SearchAnnual;
  close: () => void;
};
export default function AnnualFormModal({ annual, close }: Props) {
  const { updateAnnual } = useAnnual();
  const [dataForm, setDataForm] = useState(annual);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          연차 조정
        </h3>
      </div>

      <div className="border-b border-gray-200 bg-white px-4  sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            이메일
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="email"
              name="email"
              id="email"
              value={dataForm.email}
              onChange={handleChange}
              readOnly={true}
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            이름
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="name"
              id="name"
              value={dataForm.name}
              onChange={handleChange}
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="annualCount"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            연차 수량
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="number"
              name="annualCount"
              id="annualCount"
              value={dataForm.annualCount}
              onChange={handleChange}
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="useAnnualCount"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            사용량
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="number"
              name="useAnnualCount"
              id="useAnnualCount"
              value={dataForm.useAnnualCount}
              onChange={handleChange}
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="prevUseAnnualCount"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            작년 초과분
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="number"
              name="prevUseAnnualCount"
              id="prevUseAnnualCount"
              value={dataForm.prevUseAnnualCount}
              onChange={handleChange}
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          updateAnnual(dataForm);
          close();
        }}
        className="mt-10  w-full !text-main-color !border-main-color justify-center"
      >
        실행
      </button>
    </>
  );
}
