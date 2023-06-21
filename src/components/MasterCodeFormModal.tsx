"use client";
import { RadioGroup } from "@headlessui/react";
import { ChangeEvent, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { DBMasterCode } from "@/models/masterCode.model";

type Props = {
  masterCode: Omit<DBMasterCode, "_id">;
};
export default function MasterCodeFormModal({ masterCode }: Props) {
  const [dataForm, setDataForm] = useState(masterCode);
  const [loading, setLoading] = useState(false);

  const isNew = !masterCode.code;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = () => {
    setLoading(true);

    fetch(`/api/admin/management/masterCode`, {
      method: isNew ? "POST" : "PUT",
      body: JSON.stringify(dataForm),
    })
      .then(async (res) => {
        if (!res.ok) {
          window.alert(`${res.status} ${await res.text()}`);
          setLoading(false);
          return;
        }
        window.alert("성공");
        window.location.reload();
      })

      .catch((err) => {
        window.alert(err.toString());
        setLoading(false);
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          마스터 코드
        </h3>
      </div>

      <div className="border-b border-gray-200 bg-white px-4  sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="code"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            Code
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="code"
              id="code"
              value={dataForm.code}
              onChange={handleChange}
              readOnly={!isNew}
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="masterCode"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            masterCode
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="masterCode"
              id="masterCode"
              value={dataForm.masterCode}
              onChange={handleChange}
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="masterCode"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            description
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="description"
              id="description"
              value={dataForm.description}
              onChange={handleChange}
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="codeValue"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            codeValue
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="codeValue"
              id="codeValue"
              value={dataForm.codeValue}
              onChange={handleChange}
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="codeSubValue"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            codeSubValue
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="codeSubValue"
              id="codeSubValue"
              value={dataForm.codeSubValue}
              onChange={handleChange}
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <RadioGroup
        value={dataForm.isUse}
        onChange={(e) => {
          setDataForm((prev) => ({ ...prev, isUse: e }));
        }}
        className="border-b border-gray-200 bg-white px-4 sm:px-6"
      >
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
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
        </div>
      </RadioGroup>
      <button
        onClick={handleClick}
        className="mt-10  w-full !text-main-color !border-main-color justify-center"
      >
        실행
      </button>
    </>
  );
}
