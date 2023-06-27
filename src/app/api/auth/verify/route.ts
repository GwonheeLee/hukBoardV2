import { LoginCode } from "@/models/loginCode.model";
import { getAuthMember } from "@/service/member";
import { UnAuthorizedError, serverErrorResponse } from "@/utils/errro";
import { sendMail } from "@/utils/mail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
    const member = await getAuthMember(email);

    if (!member) {
      throw new UnAuthorizedError("등록된 사용자가 아닙니다.");
    }

    const loginCode = getRandomCode();
    console.log("로그인 코드", loginCode);

    await LoginCode.findOneAndUpdate(
      { email },
      { $set: { code: loginCode } },
      { upsert: true }
    );
    await sendMail(email, loginCode);
    return NextResponse.json("이메일 발송 완료");
  } catch (e: any) {
    return serverErrorResponse(e);
  }
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
