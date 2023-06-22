import ManagementList from "@/components/ManagementList";
import MasetCodeList from "@/components/MasterCodeList";
import { getMasterCodeList } from "@/service/masterCode";

export default async function ManagementPage() {
  const masterCodeList = await fetch("/api/client/mastercode", {
    method: "GET",
  }).then((res) => res.json());

  return (
    <section className="w-full">
      <ManagementList />
      <MasetCodeList masterCodeList={masterCodeList} />
    </section>
  );
}
