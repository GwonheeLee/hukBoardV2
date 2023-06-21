import { getAnnualListOf } from "@/service/annual";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    baseYear: string;
  };
};
export async function GET(_: NextRequest, context: Context) {
  const {
    params: { baseYear },
  } = context;

  try {
    const annualList = await getAnnualListOf(baseYear);

    return NextResponse.json(annualList);
  } catch (e: any) {
    return new Response(e.message, { status: 400 });
  }
}
