"use client";

import useEventHistoryList from "@/hooks/useEventHistory";
import LoadingSpinner from "./LoadingSpinner";

const eventHistoryList = [
  {
    id: "213",
    eventCode: "E00001",
    evnetName: "연차",
    description: "아아",
    startDate: "2023-05-05",
    endDate: "2023-06-06",
    isApproval: true,
  },
];
export default function EventHistoryList() {
  const {
    eventHistorys,
    isLoading,
    baseYear,
    changeBaseYear,
    pageNumber,
    changePageNumber,
  } = useEventHistoryList();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="flex justify-end space-x-4 mt-4  sm:ml-16 sm:flex-none">
        <div className="flex items-baseline">
          <button
            onClick={() => {
              changeBaseYear("-");
            }}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            ◀
          </button>
          <span className="rounded-md border border-gray-300 bg-white px-4 py-2 ">
            {baseYear}
          </span>
          <button
            onClick={() => {
              changeBaseYear("+");
            }}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            ▶
          </button>
        </div>
        <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
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
                      UID
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
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      승인 여부
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4  sm:pr-6"
                    >
                      <span className="sr-only">ACTION</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {!eventHistorys || eventHistorys.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="font-bold text-center text-pink-500 h-32"
                      >
                        데이터가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    eventHistorys.map((eventHistory) => (
                      <tr key={eventHistory.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {eventHistory.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {eventHistory.eventCode}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {eventHistory.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {eventHistory.startDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {eventHistory.endDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {eventHistory.isApproval ? "승인" : "미승인"}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
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
    </>
  );
}
