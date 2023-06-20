import { dbConnect } from "@/lib/mongodb";
import { MasterCode } from "@/models/masterCode.model";
import { Member } from "@/models/member.model";
import { DBMember } from "@/types/member";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  return NextResponse.json("hi");
}
