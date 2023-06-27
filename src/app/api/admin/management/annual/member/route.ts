import { dbConnect } from "@/lib/mongodb";
import { Annual } from "@/models/annual.model";
import { createAnnual } from "@/service/annual";
import { getMember } from "@/service/member";
import { BadRequestError, serverErrorResponse } from "@/utils/errro";
import { regEmail, regYear } from "@/utils/regex";
import { withAdmin } from "@/utils/withReqeust";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return withAdmin(async (member) => {
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

      const result = await createAnnual(member, baseYear);

      if (result.result === false) {
        return serverErrorResponse(
          new Error("연차 생성 도중 문제가 발생 했습니다.")
        );
      }

      return NextResponse.json("성공");
    } catch (e: any) {
      return serverErrorResponse(e);
    }
  });
}

export async function DELETE(req: NextRequest) {
  return withAdmin(async (member) => {
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
  });
}
