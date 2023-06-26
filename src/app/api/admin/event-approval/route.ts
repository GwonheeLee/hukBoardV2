import { getSearchApprovalList, updateApproval } from "@/service/eventHistory";
import { BadRequestError, serverErrorResponse } from "@/utils/errro";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageNumber = searchParams.get("pageNumber");

  try {
    if (!pageNumber || !Number.isInteger(+pageNumber)) {
      throw new BadRequestError("인자 잘못 됨");
    }

    const datas = await getSearchApprovalList(Math.abs(+pageNumber));
    return NextResponse.json(datas);
  } catch (e: any) {
    return serverErrorResponse(e);
  }
}

export async function PATCH(req: NextRequest) {
  const { id, approval } = await req.json();

  try {
    if (!id) {
      throw new BadRequestError("인자 잘못 됨");
    }

    const result = await updateApproval(id, approval);

    if (!result) {
      throw new BadRequestError("승인 실패");
    } else {
      return NextResponse.json("성공");
    }
  } catch (e: any) {
    return serverErrorResponse(e);
  }
}
