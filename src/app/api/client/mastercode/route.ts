import { getMasterCodeList } from "@/service/masterCode";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await getMasterCodeList());
}
