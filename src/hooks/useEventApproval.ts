"use client";
import useSWR from "swr";

import { useCallback, useState } from "react";
import { SearchApproval } from "@/service/eventHistory";
import { clientResponseHandler } from "@/utils/errro";

export default function useEventApprovalList() {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: eventHistorys,
    isLoading,
    error,
    mutate,
  } = useSWR<SearchApproval[]>(
    `/api/admin/event-approval?pageNumber=${pageNumber}`
  );

  const updateApproval = useCallback(
    (id: string, approval: boolean) => {
      if (!eventHistorys) return;

      const newEventHistorys = eventHistorys.map((e) =>
        e.id === id ? { ...e, isApproval: approval } : e
      );

      return mutate(patchApproval(id, approval), {
        optimisticData: newEventHistorys,
        populateCache: false,
        revalidate: true,
        rollbackOnError: true,
      });
    },
    [eventHistorys, mutate]
  );

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
    eventList: eventHistorys,
    isLoading,
    error,
    updateApproval,
    pageNumber,
    changePageNumber,
  };
}

async function patchApproval(id: string, approval: boolean) {
  return fetch("/api/admin/event-approval", {
    method: "PATCH",
    body: JSON.stringify({ id, approval }),
  }).then(clientResponseHandler);
}
