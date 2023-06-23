import { dbConnect } from "@/lib/mongodb";
import { LoginCode } from "@/models/loginCode.model";
import { MasterCode } from "@/models/masterCode.model";
import { Member } from "@/models/member.model";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  //await LoginCode.create({ email: "gwon_hee@naver.com", code: "12321" });
  const a = await LoginCode.findOne({ email: "gwon_hee@naver.com" });
  console.log(a);
  return NextResponse.json(a);
}
