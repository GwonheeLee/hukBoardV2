import MemberList from "@/components/MemberList";
import { getMemberList } from "@/service/member";
export const dynamic = "force-dynamic";
export default async function MemberPage() {
  const memberList = await getMemberList();

  return (
    <section className="w-full">
      <MemberList memberList={memberList} />
    </section>
  );
}
