import { NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import { Member } from "@/models/member.model";
import { NextRequest, NextResponse } from "next/server";
import { DBMember } from "@/types/member";

export async function GET(req: NextRequest) {
  await dbConnect();

  const memberList = await Member.find().select(
    "email name isAdmin resignDate"
  );

  return NextResponse.json(memberList);
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const formData: Omit<DBMember, "_id"> = await req.json();

  try {
    const result = await Member.create(formData);

    return NextResponse.json("성공");
  } catch (e: any) {
    console.log(e.message);
    return new Response(e.message, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();

  const formData: Omit<DBMember, "_id"> = await req.json();

  try {
    await Member.findOneAndUpdate(
      { email: formData.email },
      {
        $set: { ...formData },
      }
    );

    return NextResponse.json("성공");
  } catch (e: any) {
    return new Response(e.message, { status: 400 });
  }
}
