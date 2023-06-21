"use client";
import { regEmail, regYear } from "@/utils/regex";
import { RadioGroup } from "@headlessui/react";
import { ChangeEvent, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function AnnualMembers() {
  const [dataForm, setDataForm] = useState({
    baseYear: "",
    methodOption: true,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = () => {
    if (!dataForm.baseYear || regYear.test(dataForm.baseYear) === false) {
      window.alert("기준일 형식이 안 맞습니다.");
      return;
    }

    setLoading(true);

    // nextjs 13 에서 delete의 body json 버그가 존재함
    fetch(
      `/api/admin/management/annual/members?baseYear=${dataForm.baseYear}`,
      {
        method: dataForm.methodOption ? "POST" : "DELETE",
        body: JSON.stringify({
          baseYear: dataForm.baseYear,
        }),
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          window.alert(`${res.status} ${await res.text()}`);
          return;
        }
        window.alert("성공");
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
    <>
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          연차 생성/삭제 - 전 사원
        </h3>
      </div>

      <div className="border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="baseYear"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            기준일 (yyyy)
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="baseYear"
              id="baseYear"
              value={dataForm.baseYear}
              onChange={handleChange}
              className="block w-full rounded-md border-0  py-1.5 pl-1.5 ml-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <RadioGroup
        value={dataForm.methodOption}
        onChange={(e) => {
          setDataForm((prev) => ({ ...prev, methodOption: e }));
        }}
        className="border-b border-gray-200 bg-white px-4 sm:px-6"
      >
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
            HTTP METHOD
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
                  POST (연차 생성)
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
                  DELETE (연차 삭제)
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
