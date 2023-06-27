import { dbConnect } from "@/lib/mongodb";
import { LoginCode } from "@/models/loginCode.model";
import { MasterCode } from "@/models/masterCode.model";
import { Member } from "@/models/member.model";
import { DateObject } from "@/utils/date";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  return NextResponse.json("hi");
}
