import { DBAnnual } from "@/models/annual.model";
import { updateAnnual } from "@/service/annual";

import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const annual: Omit<DBAnnual, "_id"> = await req.json();

  try {
    await updateAnnual(annual);

    return NextResponse.json("성공");
  } catch (e: any) {
    return new Response(e.message, { status: 400 });
  }
}
