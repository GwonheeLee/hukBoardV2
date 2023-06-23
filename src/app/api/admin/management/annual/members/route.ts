import { dbConnect } from "@/lib/mongodb";
import { Annual } from "@/models/annual.model";
import { Member } from "@/models/member.model";
import { regYear } from "@/utils/regex";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { baseYear }: { baseYear: string } = await req.json();

  if (regYear.test(baseYear) === false) {
    return new Response("올바른 인자 값이 아닙니다.", { status: 400 });
  }
  try {
    await dbConnect();

    const memberList = await Member.find({ resignDate: null });
    const promiseList = memberList.map((member) =>
      fetch(`${req.nextUrl.origin}/api/admin/management/annual/member`, {
        method: "POST",
        body: JSON.stringify({ email: member.email, baseYear }),
      })
    );

    await Promise.all(promiseList);

    return NextResponse.json("굳");
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  // nextjs 13 에서 delete의 body json 버그가 존재함
  const { searchParams } = new URL(req.url);

  const baseYear = searchParams.get("baseYear");

  if (!baseYear || regYear.test(baseYear) === false) {
    return new Response("올바른 인자 값이 아닙니다.", { status: 400 });
  }

  try {
    await dbConnect();

    await Annual.deleteMany({ baseYear });
    return NextResponse.json("성공");
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}
