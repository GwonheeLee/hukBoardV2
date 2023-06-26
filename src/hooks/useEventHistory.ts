"use client";

import { DBEventHistory } from "@/models/eventHistory.model";
import { PostEventHistory } from "@/service/eventHistory";
import { clientResponseHandler } from "@/utils/errro";
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
  const addEventHistory = useCallback(
    (event: Omit<PostEventHistory, "email">) => {
      return mutate(postEventHistory(event), {
        populateCache: false,
        revalidate: true,
        rollbackOnError: true,
      });
    },
    [mutate]
  );
  const removeEventHistory = useCallback(
    (id: string) => {
      return mutate(deleteEventHistory(id), {
        populateCache: false,
        revalidate: true,
        rollbackOnError: true,
      });
    },
    [mutate]
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
    addEventHistory,
    removeEventHistory,
  };
}

async function postEventHistory(event: Omit<PostEventHistory, "email">) {
  return fetch("/api/client/event-history", {
    method: "POST",
    body: JSON.stringify(event),
  }).then(clientResponseHandler);
}

async function deleteEventHistory(id: string) {
  return fetch(`/api/client/event-history?id=${id}`, {
    method: "DELETE",
  }).then(clientResponseHandler);
}
