"use client";

import { SearchEventModel } from "@/models/eventModel.model";
import { useRouter } from "next/navigation";

export default function EventModelList({
  eventModelList,
}: {
  eventModelList: SearchEventModel[];
}) {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-end space-x-4 mt-4  sm:ml-16 sm:flex-none">
        <button
          onClick={() => router.push("./event-model/new")}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          등록
        </button>
      </div>
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
                      이벤트 코드
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      이벤트 명
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      사용 여부
                    </th>

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {!eventModelList.length ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="font-bold text-center text-pink-500 h-32"
                      >
                        데이터가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    eventModelList.map((eventModel: SearchEventModel) => (
                      <tr key={eventModel.eventCode}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {eventModel.eventCode}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {eventModel.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {eventModel.isUse ? "사용" : "미사용"}
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            className="text-pink-400 hover:text-pink-800"
                            onClick={() =>
                              router.push(
                                `./event-model/${eventModel.eventCode}`
                              )
                            }
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
