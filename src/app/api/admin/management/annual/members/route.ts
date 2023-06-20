import { dbConnect } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { baseYear: string };
};
export async function POST(req: NextRequest, context: Context) {
  const {
    params: { baseYear },
  } = context;

  //await dbConnect();

  console.log("맴버스스", baseYear);
  NextResponse.json("굳");
}
