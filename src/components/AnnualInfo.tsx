"use client";

import { useEffect, useState } from "react";

export default function AnnualInfo() {
  const [annaul, setAnnual] = useState({
    annualCount: 0,
    useAnnualCount: 0,
    prevUseAnnualCount: 0,
  });

  useEffect(() => {
    fetch("/api/client/annual", { method: "GET" })
      .then((res) => res.json())
      .then(setAnnual);
  }, []);
  return (
    <section>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 ">
          <dt className="truncate text-sm font-medium text-gray-500">연차</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {annaul.annualCount}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 ">
          <dt className="truncate text-sm font-medium text-gray-500">사용량</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {annaul.useAnnualCount}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 ">
          <dt className="truncate text-sm font-medium text-gray-500">
            작년 사용량
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {annaul.prevUseAnnualCount}
          </dd>
        </div>
      </dl>
    </section>
  );
}
