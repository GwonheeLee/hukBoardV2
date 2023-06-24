import { getEventHistoryListPage } from "@/service/eventHistory";
import { regYear } from "@/utils/regex";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    year: string;
  };
};
export async function GET(req: NextRequest, context: Context) {
  const {
    params: { year },
  } = context;
  const { searchParams } = new URL(req.url);
  const pageNumber = searchParams.get("pageNumber");
  if (
    !year ||
    !regYear.test(year) ||
    !pageNumber ||
    !Number.isInteger(+pageNumber)
  ) {
    return new NextResponse("인자 잘못 됨", { status: 400 });
  }

  try {
    const datas = await getEventHistoryListPage(year, Math.abs(+pageNumber));
    return NextResponse.json(datas);
  } catch (e: any) {
    return new Response(e.message, { status: 400 });
  }
}
