import ManagementList from "@/components/ManagementList";
import MasetCodeList from "@/components/MasterCodeList";
import { getMasterCode } from "@/service/masterCode";

export default async function ManagementPage() {
  const masterCodeList = await getMasterCode();
  return (
    <section className="w-full">
      <ManagementList />
      <MasetCodeList masterCodeList={masterCodeList} />
    </section>
  );
}
