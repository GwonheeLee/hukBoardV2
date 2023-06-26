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
      return mutate(patchApproval(id, approval), {
        populateCache: false,
        revalidate: true,
        rollbackOnError: true,
      });
    },
    [mutate]
  );

  const removeEvent = useCallback(
    (id: string) => {
      return mutate(deleteApproval(id), {
        populateCache: false,
        revalidate: true,
        rollbackOnError: true,
      });
    },
    [mutate]
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
    updateApproval,
    removeEvent,
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

async function deleteApproval(id: string) {
  return fetch(`/api/admin/event-approval?id=${id}`, {
    method: "DELETE",
  }).then(clientResponseHandler);
}
