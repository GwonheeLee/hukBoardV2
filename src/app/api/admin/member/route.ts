import { dbConnect } from "@/lib/mongodb";
import { DBMember, Member } from "@/models/member.model";
import { serverErrorResponse } from "@/utils/errro";
import { withAdmin } from "@/utils/withReqeust";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return withAdmin(async (member) => {
    await dbConnect();

    const formData: DBMember = await req.json();

    try {
      await Member.create(formData);

      return NextResponse.json("성공");
    } catch (e: any) {
      return serverErrorResponse(e);
    }
  });
}

export async function PUT(req: NextRequest) {
  return withAdmin(async (member) => {
    await dbConnect();

    const formData: DBMember = await req.json();

    try {
      await Member.findOneAndUpdate(
        { email: formData.email },
        {
          $set: { ...formData },
        }
      );

      return NextResponse.json("성공");
    } catch (e: any) {
      return serverErrorResponse(e);
    }
  });
}
