"use client";

import { DBEventHistory } from "@/models/eventHistory.model";
import { useState } from "react";
import useSWR from "swr";

export default function useEventHistoryList() {
  const nowYear = new Date().getFullYear().toString();
  const [baseYear, setBaseYear] = useState(nowYear);
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: eventHistorys,
    isLoading,
    error,
    mutate,
  } = useSWR<DBEventHistory[]>(
    `/api/client/event-history/${baseYear}/${pageNumber}`
  );

  const changeBaseYear = (OPTION: "+" | "-") => {
    switch (OPTION) {
      case "+":
        setPageNumber(1);
        setBaseYear((prev) => (+prev + 1).toString());
        break;
      case "-":
        setPageNumber(1);
        setBaseYear((prev) => (+prev - 1).toString());
        break;
    }
  };

  const changePageNumber = (OPTION: "+" | "-") => {
    switch (OPTION) {
      case "+":
        setPageNumber((prev) => prev + 1);
        break;
      case "-":
        if (pageNumber <= 1) {
          return;
        }
        setPageNumber((prev) => prev - 1);
        break;
    }
  };
  return {
    eventHistorys,
    isLoading,
    error,
    baseYear,
    changeBaseYear,
    pageNumber,
    changePageNumber,
  };
}
