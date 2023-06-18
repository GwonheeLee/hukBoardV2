import { NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import { Member } from "@/models/member.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("hi");
  await dbConnect();

  const memberList = await Member.find({});
  console.log(memberList);
  return NextResponse.json(memberList);
}
