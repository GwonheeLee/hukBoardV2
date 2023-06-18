"use client";

import { SearchMember } from "@/types/member";
import useSWR from "swr";

export default function MemberList() {
  const { data, isLoading, error } =
    useSWR<SearchMember[]>(`/api/admin/member`);
  return (
    <>
      {data &&
        data.map((i) => {
          <h1>{i.name}</h1>;
        })}
    </>
  );
}
