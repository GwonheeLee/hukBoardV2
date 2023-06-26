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

    return NextResponse.json({ id: result });
  } catch (e: any) {
    return serverErrorResponse(e);
  }
}
