import { getAnnualInfo } from "@/service/annual";

import { withMember } from "@/utils/withReqeust";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return withMember(async (member) => {
    const annual = await getAnnualInfo(member.email);

    return NextResponse.json(annual);
  });
}
