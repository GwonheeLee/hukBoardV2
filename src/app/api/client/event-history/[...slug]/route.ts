import { getEventHistoryListPage } from "@/service/eventHistory";
import { regYear } from "@/utils/regex";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    slug: string[];
  };
};
export async function GET(_: NextRequest, context: Context) {
  const {
    params: { slug },
  } = context;

  if (
    !slug ||
    !Array.isArray(slug) ||
    slug.length !== 2 ||
    !regYear.test(slug[0]) ||
    !Number.isInteger(+slug[1])
  ) {
    return new NextResponse("인자 잘못 됨", { status: 400 });
  }

  const baseYear = slug[0];
  const pageNumber = Math.abs(+slug[1]);

  try {
    const datas = await getEventHistoryListPage(baseYear, pageNumber);
    return NextResponse.json(datas);
  } catch (e: any) {
    return new Response(e.message, { status: 400 });
  }
}
