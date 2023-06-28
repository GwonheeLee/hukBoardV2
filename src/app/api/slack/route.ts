import { config } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "querystring";

const CHAT_URL = "https://slack.com/api/chat.postMessage";
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

    console.log(payload);
    return NextResponse.json("ok");
  } catch (e) {}
}

async function sendSlackChat(slackUID: string, message: string) {
  if (slackUID === "") {
    return;
  }
  fetch(CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + config.slack.botToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channel: slackUID,
      message,
    }),
  });
}
