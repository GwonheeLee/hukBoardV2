"use client";

import { MasterCodeT } from "@/models/masterCode.model";
import { DBMember } from "@/types/member";
import { ChangeEvent, useState } from "react";

type Props = {
  member: Omit<DBMember, "_id">;
  workTypeList: MasterCodeT[];
  teamCodeList: MasterCodeT[];
  isNew: boolean;
};
export default function MemberForm({
  member,
  workTypeList,
  teamCodeList,
  isNew,
}: Props) {
  const [memberData, setMemberData] = useState(member);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "isAdmin":
        setMemberData((prev) => ({ ...prev, isAdmin: true }));
        break;
      case "isNotAdmin":
        setMemberData((prev) => ({ ...prev, isAdmin: false }));
        break;
    }
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {};

  return (
    <form>
      <div className="m-4 space-y-12 sm:space-y-16">
        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
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
                value={memberData.email}
                onChange={handleInputChange}
                readOnly={!isNew}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
              />
            </div>
          </div>

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
                value={memberData.name}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="slackUID"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Slack UID
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="slackUID"
                id="slackUID"
                value={memberData.slackUID}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              연락처
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                id="phone"
                name="phone"
                type="phone"
                value={memberData.phone}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="workType"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              근로구분
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <select
                id="workType"
                name="workType"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                value={memberData.workType}
              >
                {workTypeList.map((w) => (
                  <option key={w.code} value={w.code}>
                    {w.codeValue}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="teamCode"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              팀
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <select
                id="teamCode"
                name="teamCode"
                value={memberData.teamCode}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {teamCodeList.map((w) => (
                  <option key={w.code} value={w.code}>
                    {w.codeValue}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="enterDate"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              입사일
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="date"
                id="enterDate"
                name="enterDate"
                value={memberData.enterDate}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="birthDay"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              생일
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="date"
                id="birthDay"
                name="birthDay"
                value={memberData.birthDay}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="resignDate"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              퇴직일
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="date"
                id="resignDate"
                name="resignDate"
                value={memberData.resignDate ?? ""}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="isAdmin"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              관리자여부
            </label>
            <div className="flex gap-4 mt-2 sm:col-span-2 sm:mt-0">
              <div key="isAdmin" className="flex items-center">
                <input
                  id="isAdmin"
                  name="isAdmin"
                  type="radio"
                  checked={memberData.isAdmin}
                  onChange={handleRadioChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="isAdmin"
                  className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  관리자
                </label>
              </div>
              <div key="isNotAdmin" className="flex items-center">
                <input
                  id="isNotAdmin"
                  name="isNotAdmin"
                  type="radio"
                  checked={!memberData.isAdmin}
                  onChange={handleRadioChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="isNotAdmin"
                  className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  일반
                </label>
              </div>
            </div>
          </div>
          {
            //
          }
        </div>
      </div>

      <div className="m-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
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
