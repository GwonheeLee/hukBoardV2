"use client";

import { useState } from "react";
import Modal from "./Modal";
import AnnualMember from "./management/AnnualMember";

const modalList = [
  {
    apiUrl: "/api/management/annual/member",
    description: "연차 생성/삭제 - 단일",
    content: <AnnualMember />,
  },
];
export default function ManagementList() {
  const [selectedContent, setSelectContent] = useState<JSX.Element>();
  return (
    <div className="mt-8 flex flex-col">
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
                    APIUrl
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Decription
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {modalList.map((data) => (
                  <>
                    <tr key={data.apiUrl}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {data.apiUrl}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {data.description}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <span
                          onClick={() => {
                            setSelectContent(data.content);
                          }}
                          className="cursor-pointer text-indigo-600 hover:text-indigo-900"
                        >
                          Action
                        </span>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedContent && (
        <Modal
          content={selectedContent}
          open={!!selectedContent}
          setOpen={() => {
            setSelectContent(undefined);
          }}
        />
      )}
    </div>
  );
}
