import { dbConnect } from "@/lib/mongodb";
import { DBEventModel, EventModel } from "@/models/eventModel.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  const formData: Omit<DBEventModel, "_id"> = await req.json();

  try {
    const result = await EventModel.create(formData);

    return NextResponse.json("성공");
  } catch (e: any) {
    return new Response(e.message, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();

  const formData: Omit<DBEventModel, "_id"> = await req.json();

  try {
    await EventModel.findOneAndUpdate(
      { eventCode: formData.eventCode },
      {
        $set: { ...formData },
      }
    );

    return NextResponse.json("성공");
  } catch (e: any) {
    return new Response(e.message, { status: 400 });
  }
}
