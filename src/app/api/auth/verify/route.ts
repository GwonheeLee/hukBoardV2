import { dbConnect } from "@/lib/mongodb";
import { LoginCode } from "@/models/loginCode.model";
import { Member } from "@/models/member.model";
import { isExistMember } from "@/service/auth";
import { sendMail } from "@/utils/mail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email } = await req.json();
  const result = await isExistMember(email);

  if (!result) {
    return new Response("등록된 사용자가 아닙니다.", { status: 401 });
  }

  const loginCode = getRandomCode();
  console.log("로그인 코드", loginCode);

  await LoginCode.findOneAndUpdate(
    { email },
    { $set: { code: loginCode } },
    { upsert: true }
  );
  //await sendMail(email, loginCode);
  return new Response("이메일 발송 완료", { status: 200 });
}

function getRandomCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < 13; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}
