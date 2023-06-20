import { dbConnect } from "@/lib/mongodb";
import { Annual } from "@/models/annual.model";
import { Member } from "@/models/member.model";
import { getAnnualOf } from "@/service/annual";
import { MASTER_CODE_ENUM, getMasterCode } from "@/service/masterCode";
import { DBMember } from "@/types/member";
import { regEmail, regYear } from "@/utils/regex";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, baseYear }: { email: string; baseYear: string } =
    await req.json();

  if (regEmail.test(email) === false || regYear.test(baseYear) === false) {
    return new Response("올바른 인자 값이 아닙니다.", { status: 400 });
  }

  await dbConnect();

  const member = await Member.findOne<DBMember>({ email });

  if (!member || !member.resignDate) {
    return new Response(`${email}에 해당하는 맴버는 없습니다.`, {
      status: 400,
    });
  }

  const prevBaseYear = (+baseYear - 1).toString();

  const curAnnual = await getAnnualOf(email, baseYear);

  NextResponse.json("굳");
}

async function getAnnualCount(enterDate: string, baseYear: string) {
  const date = new Date(enterDate);

  // 신규 입사자
  if (+baseYear === date.getFullYear()) {
    return 11 - date.getMonth();
  }

  const annualMasterCodeList = await getMasterCode(MASTER_CODE_ENUM.연차수량);

  const yearDiff = +baseYear - date.getFullYear();

  const 연차정보 = annualMasterCodeList.find((i) => +i.codeValue === yearDiff);

  if (!연차정보) {
    throw new Error(`${yearDiff}년차에 대한 정보가 MasterCode에 없습니다.`);
  }

  return +연차정보.codeSubValue;
}
