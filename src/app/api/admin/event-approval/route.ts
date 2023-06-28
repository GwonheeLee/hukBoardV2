import { EventHistory } from "@/models/eventHistory.model";
import { getSearchApprovalList, updateApproval } from "@/service/eventHistory";
import { sendSlackChatApproval } from "@/service/slack";
import { BadRequestError, serverErrorResponse } from "@/utils/errro";
import { withAdmin } from "@/utils/withReqeust";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return withAdmin(async (member) => {
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
  });
}

export async function PATCH(req: NextRequest) {
  return withAdmin(async (member) => {
    const { id, approval } = await req.json();

    try {
      if (!id) {
        throw new BadRequestError("인자 잘못 됨");
      }

      const result = await updateApproval(id, approval);

      if (!result) {
        throw new BadRequestError("승인 실패");
      } else {
        await sendSlackChatApproval(id, member.name);
        return NextResponse.json("성공");
      }
    } catch (e: any) {
      return serverErrorResponse(e);
    }
  });
}

export async function DELETE(req: NextRequest) {
  return withAdmin(async (member) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
      if (!id) {
        throw new BadRequestError("올바른 인자 값이 아닙니다.");
      }

      const result = await updateApproval(id, false);

      if (!result) {
        throw new Error(
          "이벤트 승인 변경에서 문제가 발생했습니다. 관리자에게 문의 꼭 부탁드립니다."
        );
      }

      await EventHistory.findByIdAndDelete(id);

      return NextResponse.json("성공");
    } catch (e: any) {
      return serverErrorResponse(e);
    }
  });
}
