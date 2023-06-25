"use client";

import useEventApprovalList from "@/hooks/useEventApproval";
import LoadingSpinner from "./LoadingSpinner";

export default function EventApprovalList() {
  const {
    eventList,
    isLoading,
    error,
    pageNumber,
    changePageNumber,
    updateApproval,
  } = useEventApprovalList();
  if (isLoading) {
    return <LoadingSpinner />;
  }

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
                    UID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    이름
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
                    사유
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    시작 일
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    종료 일
                  </th>

                  <th scope="col" className="relative">
                    <span className="sr-only">ACTION</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {!eventList || eventList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="font-bold text-center text-pink-500 h-32"
                    >
                      데이터가 없습니다.
                    </td>
                  </tr>
                ) : (
                  eventList.map((event) => (
                    <tr key={event.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {event.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.eventName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.startDate}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.endDate}
                      </td>
                      <td className="relative whitespace-nowrap  text-right text-sm font-medium pr-2 ">
                        {!event.isApproval && (
                          <button
                            className="text-pink-400 hover:text-pink-800"
                            onClick={() =>
                              updateApproval(event.id, !event.isApproval)
                            }
                          >
                            APPROVAL
                          </button>
                        )}
                      </td>
                      <td className="relative whitespace-nowrap  text-right text-sm font-medium pr-2">
                        <button
                          className="text-pink-400 hover:text-pink-800"
                          onClick={() => {}}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={9}>
                    <nav
                      className="flex items-center  justify-between  px-4 py-2 sm:px-6"
                      aria-label="Pagination"
                    >
                      <div className="flex flex-1 justify-between sm:justify-end">
                        <button
                          onClick={() => changePageNumber("-")}
                          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                        >
                          ◀
                        </button>
                        <span className="rounded-md border border-gray-300 bg-white px-4 py-2 ">
                          {pageNumber}
                        </span>
                        <button
                          onClick={() => changePageNumber("+")}
                          className="relative  inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                        >
                          ▶
                        </button>
                      </div>
                    </nav>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
