"use client";

import { useState } from "react";
import Modal from "./Modal";
import { DBMasterCode } from "@/models/masterCode.model";
import MasterCodeFormModal from "./MasterCodeFormModal";

type Props = {
  masterCodeList: Omit<DBMasterCode, "_id">[];
};
const initMasterCode: Omit<DBMasterCode, "_id"> = {
  code: "",
  masterCode: "",
  description: "",
  codeValue: "",
  codeSubValue: "",
  isUse: true,
};
export default function MasetCodeList({ masterCodeList }: Props) {
  const [selectedMasterCode, setSelectedMasterCode] =
    useState<Omit<DBMasterCode, "_id">>();
  return (
    <div className="mt-8 flex flex-col">
      <div className="flex justify-end space-x-4 my-4  sm:ml-16 sm:flex-none">
        <button
          onClick={() => setSelectedMasterCode(initMasterCode)}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          마스터 코드 등록
        </button>
      </div>
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    코드
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    마스터코드
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    설명
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Code Value
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Code Sub Value
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    사용 여부
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {masterCodeList.map((data) => (
                  <tr key={data.code}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {data.code}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {data.masterCode}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {data.description}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {data.codeValue}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {data.codeSubValue}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {data.isUse ? "사용" : "미사용"}
                    </td>

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <span
                        onClick={() => {
                          setSelectedMasterCode(data);
                        }}
                        className="cursor-pointer text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedMasterCode && (
        <Modal
          content={<MasterCodeFormModal masterCode={selectedMasterCode} />}
          open={!!selectedMasterCode}
          setOpen={() => {
            setSelectedMasterCode(undefined);
          }}
        />
      )}
    </div>
  );
}
