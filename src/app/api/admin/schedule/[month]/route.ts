import { getSchedule } from "@/service/schedule";
import { BadRequestError, serverErrorResponse } from "@/utils/errro";
import { regMonthDate } from "@/utils/regex";
import { withAdmin } from "@/utils/withReqeust";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    month: string;
  };
};
export async function GET(req: NextRequest, context: Context) {
  return withAdmin(async (member) => {
    const {
      params: { month },
    } = context;
    try {
      if (regMonthDate.test(month) === false) {
        throw new BadRequestError("잘못된 인자 값");
      }
      const data = await getSchedule(month);

      return NextResponse.json(Array.from(data));
    } catch (e: any) {
      return serverErrorResponse(e);
    }
  });
}
