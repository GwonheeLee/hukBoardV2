import { getSearchApprovalList, updateApproval } from "@/service/eventHistory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageNumber = searchParams.get("pageNumber");

  if (!pageNumber || !Number.isInteger(+pageNumber)) {
    return new NextResponse("인자 잘못 됨", { status: 400 });
  }

  try {
    const datas = await getSearchApprovalList(Math.abs(+pageNumber));
    return NextResponse.json(datas);
  } catch (e) {
    return new Response(JSON.stringify(e), { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const { id, approval } = await req.json();

  if (!id) {
    return new NextResponse("인자 잘못 됨", { status: 400 });
  }

  try {
    const result = await updateApproval(id, approval);

    if (!result) {
      return new Response("실패", { status: 444 });
    } else {
      return NextResponse.json("성공");
    }
  } catch (e) {
    return new Response(JSON.stringify(e), { status: 400 });
  }
}
