import { config } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
const CHAT_URL = "https://slack.com/api/chat.postMessage";
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    console.log("페이 : ", payload);
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
