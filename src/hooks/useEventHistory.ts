"use client";

import { DBEventHistory } from "@/models/eventHistory.model";
import { useCallback, useState } from "react";
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
    `/api/client/event-history/${baseYear}?pageNumber=${pageNumber}`
  );

  const changeBaseYear = useCallback((OPTION: "+" | "-") => {
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
  }, []);

  const changePageNumber = useCallback((OPTION: "+" | "-") => {
    switch (OPTION) {
      case "+":
        setPageNumber((prev) => prev + 1);
        break;
      case "-":
        setPageNumber((prev) => {
          if (prev <= 1) {
            return prev;
          } else {
            return prev - 1;
          }
        });
        break;
    }
  }, []);
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

async function postEventHistory(event: Omit<DBEventHistory, "id">) {
  return fetch("/api/client/event-history", {
    method: "POST",
    body: JSON.stringify(event),
  }).then(async (res) => {
    if (!res.ok) {
      const message = await res.text();
      throw new Error(`상태코드 : ${res.status} \n 메세지 : ${message}`);
    }

    return res.json();
  });
}
