import { EventHistory } from "@/models/eventHistory.model";
import { PostEventHistory, addEventHistory } from "@/service/eventHistory";
import { BadRequestError, serverErrorResponse } from "@/utils/errro";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    eventCode,
    email,
    description,
    startDate,
    endDate,
  }: PostEventHistory = await req.json();

  try {
    if (
      !eventCode ||
      !email ||
      !description ||
      !startDate ||
      !endDate ||
      startDate > endDate
    ) {
      throw new BadRequestError("잘못된 인자 값 입니다.");
    }

    const result = await addEventHistory({
      eventCode,
      email,
      description,
      startDate,
      endDate,
    });

    if (typeof result !== "string") {
      throw new Error("이벤트 등록이 실패 했습니다.");
    }

    return NextResponse.json({ id: result });
  } catch (e: any) {
    return serverErrorResponse(e);
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  try {
    if (!id) {
      throw new BadRequestError("잘못된 인자 값 입니다.");
    }
    await EventHistory.findByIdAndDelete(id);

    return NextResponse.json("성공");
  } catch (e: any) {
    return serverErrorResponse(e);
  }
}
