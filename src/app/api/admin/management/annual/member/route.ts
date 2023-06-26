import { dbConnect } from "@/lib/mongodb";
import { Annual, DBAnnual } from "@/models/annual.model";
import { getAnnualOf } from "@/service/annual";
import { MASTER_CODE_ENUM, getMasterCodeOf } from "@/service/masterCode";
import { getMember } from "@/service/member";
import { BadRequestError, serverErrorResponse } from "@/utils/errro";
import { regEmail, regYear } from "@/utils/regex";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, baseYear }: { email: string; baseYear: string } =
    await req.json();

  try {
    if (regEmail.test(email) === false || regYear.test(baseYear) === false) {
      throw new BadRequestError("올바른 인자 값이 아닙니다.");
    }

    const member = await getMember(email);

    if (!member || !!member.resignDate) {
      throw new BadRequestError(`${email}에 해당하는 맴버는 없습니다.`);
    }

    const prevBaseYear = (+baseYear - 1).toString();

    const curAnnual = await getAnnualOf(email, baseYear);

    if (curAnnual) {
      throw new BadRequestError(`${baseYear}에 해당하는 연차가 존재 합니다.`);
    }

    const prevAnnual = await getAnnualOf(email, prevBaseYear);

    const useAnnualCount = await getAnnualCount(email, baseYear);

    const newAnnual: Omit<DBAnnual, "id"> = {
      baseYear: baseYear,
      email: email,
      annualCount: await getAnnualCount(member.enterDate, baseYear),
      useAnnualCount: useAnnualCount,
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
    return serverErrorResponse(e);
  }
}

export async function DELETE(req: NextRequest) {
  // nextjs 13 에서 delete의 body json 버그가 존재함
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const baseYear = searchParams.get("baseYear");

  // const { email, baseYear }: { email: string; baseYear: string } =
  //   await req.json();
  try {
    if (
      !email ||
      !baseYear ||
      regEmail.test(email) === false ||
      regYear.test(baseYear) === false
    ) {
      throw new BadRequestError("올바른 인자 값이 아닙니다.");
    }

    await dbConnect();

    await Annual.deleteOne({ email, baseYear });
    return NextResponse.json("성공");
  } catch (e: any) {
    return serverErrorResponse(e);
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
