import { NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import { Member } from "@/models/member.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  const memberList = await Member.find().select(
    "email name isAdmin resignDate"
  );

  return NextResponse.json(memberList);
}
