import MemberForm from "@/components/MemberForm";
import { MASTER_CODE_ENUM, getMasterCode } from "@/service/masterCode";
import { getMember } from "@/service/member";
import { DBMember } from "@/types/member";

type Props = {
  params: {
    email: string;
  };
};

export default async function MemberDetailPage({ params: { email } }: Props) {
  const workTypeList = await getMasterCode(MASTER_CODE_ENUM.WORK_TYPE);
  const teamCodeList = await getMasterCode(MASTER_CODE_ENUM.TEAM_CODE);

  let member;
  let isNew = false;
  if (email === "new") {
    member = {
      email: "",
      name: "",
      isAdmin: false,
      teamCode: "H02001",
      resignDate: null,
      workType: "H01001",
      enterDate: "",
      phone: "",
      slackUID: "",
      birthDay: "",
    };
    isNew = true;
  } else {
    member = await getMember(decodeURIComponent(email));
  }

  if (!member) {
    return <h1>해당 맴버는 없습니다</h1>;
  }

  return (
    <section className="w-full m-2 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
      <MemberForm
        member={member}
        workTypeList={workTypeList}
        teamCodeList={teamCodeList}
        isNew={isNew}
      />
    </section>
  );
}
