import { config } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "querystring";

export async function POST(req: NextRequest) {
  try {
    const reader = req.body!.getReader();
    let result = await reader.read();
    let decoder = new TextDecoder("utf-8");
    let body = "";

    while (!result.done) {
      body += decoder.decode(result.value);
      result = await reader.read();
    }

    const payload = parse(body);
    //     const parsedPayload = JSON.parse(payload!.payload);
    // const token = parsedPayload.token;

    //     console.log(payload?.payload?.token );
    return NextResponse.json("ok");
  } catch (e) {}
}
