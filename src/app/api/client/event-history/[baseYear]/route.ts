import { getEventHistoryListPage } from "@/service/eventHistory";
import { BadRequestError, serverErrorResponse } from "@/utils/errro";
import { regYear } from "@/utils/regex";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    baseYear: string;
  };
};
export async function GET(req: NextRequest, context: Context) {
  const {
    params: { baseYear },
  } = context;
  const { searchParams } = new URL(req.url);
  const pageNumber = searchParams.get("pageNumber");

  try {
    if (
      !baseYear ||
      !regYear.test(baseYear) ||
      !pageNumber ||
      !Number.isInteger(+pageNumber)
    ) {
      throw new BadRequestError("인자 잘못 됨");
    }

    const datas = await getEventHistoryListPage(
      baseYear,
      Math.abs(+pageNumber)
    );
    return NextResponse.json(datas);
  } catch (e: any) {
    return serverErrorResponse(e);
  }
}
