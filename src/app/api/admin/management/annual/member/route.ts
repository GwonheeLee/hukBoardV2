import { dbConnect } from "@/lib/mongodb";
import { Annual, DBAnnual } from "@/models/annual.model";
import { getAnnualOf } from "@/service/annual";
import { MASTER_CODE_ENUM, getMasterCodeOf } from "@/service/masterCode";
import { getMember } from "@/service/member";
import { regEmail, regYear } from "@/utils/regex";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, baseYear }: { email: string; baseYear: string } =
    await req.json();

  if (regEmail.test(email) === false || regYear.test(baseYear) === false) {
    return new Response("올바른 인자 값이 아닙니다.", { status: 400 });
  }

  try {
    const member = await getMember(email);

    if (!member || !!member.resignDate) {
      return new Response(`${email}에 해당하는 맴버는 없습니다.`, {
        status: 400,
      });
    }

    const prevBaseYear = (+baseYear - 1).toString();

    const curAnnual = await getAnnualOf(email, baseYear);

    if (curAnnual) {
      return new Response(`${baseYear}에 해당하는 연차가 존재 합니다.`, {
        status: 400,
      });
    }

    const prevAnnual = await getAnnualOf(email, prevBaseYear);

    const newAnnual: Omit<DBAnnual, "id"> = {
      baseYear: baseYear,
      email: email,
      name: member.name,
      annualCount: await getAnnualCount(member.enterDate, baseYear),
      useAnnualCount: 0,
      prevUseAnnualCount: prevAnnual
        ? prevAnnual.annualCount -
            prevAnnual.useAnnualCount -
            prevAnnual.prevUseAnnualCount >=
          0
          ? 0
          : Math.abs(
              prevAnnual.annualCount -
                prevAnnual.useAnnualCount -
                prevAnnual.prevUseAnnualCount
            )
        : 0,
    };

    await Annual.create(newAnnual);
    return NextResponse.json("성공");
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  // nextjs 13 에서 delete의 body json 버그가 존재함
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const baseYear = searchParams.get("baseYear");

  // const { email, baseYear }: { email: string; baseYear: string } =
  //   await req.json();

  if (
    !email ||
    !baseYear ||
    regEmail.test(email) === false ||
    regYear.test(baseYear) === false
  ) {
    return new Response("올바른 인자 값이 아닙니다.", { status: 400 });
  }

  try {
    await dbConnect();

    await Annual.deleteOne({ email, baseYear });
    return NextResponse.json("성공");
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}

async function getAnnualCount(enterDate: string, baseYear: string) {
  const date = new Date(enterDate);

  // 신규 입사자
  if (+baseYear === date.getFullYear()) {
    return 11 - date.getMonth();
  }

  const annualMasterCodeList = await getMasterCodeOf(MASTER_CODE_ENUM.연차수량);

  const yearDiff = +baseYear - date.getFullYear();

  const 연차정보 = annualMasterCodeList.find((i) => +i.codeValue === yearDiff);

  if (!연차정보) {
    throw new Error(`${yearDiff}년차에 대한 정보가 MasterCode에 없습니다.`);
  }

  return +연차정보.codeSubValue;
}
