"use client";

import useSWR from "swr";
import { useCallback, useState } from "react";
import { DBAnnual } from "@/models/annual.model";
import { SearchAnnual } from "@/service/annual";

export default function useAnnual() {
  const nowYear = new Date().getFullYear().toString();
  const [baseYear, setBaseYear] = useState(nowYear);

  const {
    data: annuals,
    isLoading,
    error,
    mutate,
  } = useSWR<SearchAnnual[]>(`/api/admin/annual/${baseYear}`);

  const updateAnnual = useCallback(
    (annual: SearchAnnual) => {
      if (!annuals) return;

      const newAnnuals = annuals.map((i) => (i.id === annual.id ? annual : i));

      return mutate(putAnnual(annual), {
        optimisticData: newAnnuals,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [mutate, annuals]
  );

  const minuseBaseYear = useCallback(() => {
    setBaseYear((prev) => (+prev - 1).toString());
  }, []);
  const plusBaseYear = useCallback(() => {
    setBaseYear((prev) => (+prev + 1).toString());
  }, []);

  return {
    annuals,
    isLoading,
    error,
    updateAnnual,
    baseYear,
    minuseBaseYear,
    plusBaseYear,
  };
}

async function putAnnual(annual: DBAnnual) {
  return fetch("/api/admin/annual", {
    method: "PUT",
    body: JSON.stringify(annual),
  }).then(async (res) => {
    if (!res.ok) {
      const message = await res.text();

      throw new Error(`상태코드 : ${res.status} \n 메세지 : ${message}`);
    }

    return res.json();
  });
}
