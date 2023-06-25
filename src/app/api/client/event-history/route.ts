import { PostEventHistory, addEventHistory } from "@/service/eventHistory";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    eventCode,
    email,
    description,
    startDate,
    endDate,
  }: PostEventHistory = await req.json();

  if (
    !eventCode ||
    !email ||
    !description ||
    !startDate ||
    !endDate ||
    startDate > endDate
  ) {
    return new Response("잘못된 파람", { status: 400 });
  }
  try {
    const result = await addEventHistory({
      eventCode,
      email,
      description,
      startDate,
      endDate,
    });

    return NextResponse.json({ id: result });
  } catch (e) {
    return new Response(JSON.stringify(e), { status: 444 });
  }
}
