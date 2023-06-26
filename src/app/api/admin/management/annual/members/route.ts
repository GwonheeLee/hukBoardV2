import { dbConnect } from "@/lib/mongodb";
import { Annual } from "@/models/annual.model";
import { Member } from "@/models/member.model";
import { BadRequestError, serverErrorResponse } from "@/utils/errro";
import { regYear } from "@/utils/regex";
import { withAdmin } from "@/utils/withReqeust";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return withAdmin(async (memeber) => {
    const { baseYear }: { baseYear: string } = await req.json();

    try {
      if (regYear.test(baseYear) === false) {
        throw new BadRequestError("올바른 인자 값이 아닙니다.");
      }

      await dbConnect();

      const memberList = await Member.find({ resignDate: null });
      const promiseList = memberList.map((member) =>
        fetch(`${req.nextUrl.origin}/api/admin/management/annual/member`, {
          method: "POST",
          body: JSON.stringify({ email: member.email, baseYear }),
        })
      );

      await Promise.all(promiseList);

      return NextResponse.json("굳");
    } catch (e: any) {
      return serverErrorResponse(e);
    }
  });
}

export async function DELETE(req: NextRequest) {
  return withAdmin(async (member) => {
    // nextjs 13 에서 delete의 body json 버그가 존재함
    const { searchParams } = new URL(req.url);

    const baseYear = searchParams.get("baseYear");

    try {
      if (!baseYear || regYear.test(baseYear) === false) {
        throw new BadRequestError("올바른 인자 값이 아닙니다.");
      }

      await dbConnect();

      await Annual.deleteMany({ baseYear });
      return NextResponse.json("성공");
    } catch (e: any) {
      return serverErrorResponse(e);
    }
  });
}
