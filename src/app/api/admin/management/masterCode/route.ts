import { dbConnect } from "@/lib/mongodb";
import { DBMasterCode, MasterCode } from "@/models/masterCode.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    code,
    masterCode,
    description,
    codeValue,
    codeSubValue,
    isUse,
  }: DBMasterCode = await req.json();

  if (
    !code ||
    code.length !== 6 ||
    !masterCode ||
    masterCode.length !== 3 ||
    !codeValue
  ) {
    return new Response("올바른 인자 값이 아닙니다.", { status: 400 });
  }

  try {
    await dbConnect();
    const masterCodeData = await MasterCode.findOne({ code });

    if (masterCodeData) {
      return new Response(`${code}에 해당하는 마스터 코드가 존재 합니다.`, {
        status: 400,
      });
    }

    await MasterCode.create({
      code,
      masterCode,
      description,
      codeValue,
      codeSubValue,
      isUse,
    });

    return NextResponse.json("성공");
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const {
    code,
    masterCode,
    description,
    codeValue,
    codeSubValue,
    isUse,
  }: DBMasterCode = await req.json();

  if (
    !code ||
    code.length !== 6 ||
    !masterCode ||
    masterCode.length !== 3 ||
    !codeValue
  ) {
    return new Response("올바른 인자 값이 아닙니다.", { status: 400 });
  }

  try {
    await dbConnect();

    await MasterCode.findOneAndUpdate(
      {
        code,
      },
      {
        $set: { code, masterCode, description, codeValue, codeSubValue, isUse },
      }
    );

    return NextResponse.json("성공");
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}
