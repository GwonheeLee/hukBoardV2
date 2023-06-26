import { dbConnect } from "@/lib/mongodb";
import { DBMasterCode, MasterCode } from "@/models/masterCode.model";
import { BadRequestError, serverErrorResponse } from "@/utils/errro";
import { withAdmin } from "@/utils/withReqeust";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return withAdmin(async (member) => {
    const {
      code,
      masterCode,
      description,
      codeValue,
      codeSubValue,
      isUse,
    }: DBMasterCode = await req.json();

    try {
      if (
        !code ||
        code.length !== 6 ||
        !masterCode ||
        masterCode.length !== 3 ||
        !codeValue
      ) {
        throw new BadRequestError("올바른 인자 값이 아닙니다.");
      }

      await dbConnect();
      const masterCodeData = await MasterCode.findOne({ code });

      if (masterCodeData) {
        throw new BadRequestError(
          `${code}에 해당하는 마스터 코드가 존재 합니다.`
        );
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
      return serverErrorResponse(e);
    }
  });
}

export async function PUT(req: NextRequest) {
  return withAdmin(async (member) => {
    const {
      code,
      masterCode,
      description,
      codeValue,
      codeSubValue,
      isUse,
    }: DBMasterCode = await req.json();

    try {
      if (
        !code ||
        code.length !== 6 ||
        !masterCode ||
        masterCode.length !== 3 ||
        !codeValue
      ) {
        throw new BadRequestError("올바른 인자 값이 아닙니다.");
      }

      await dbConnect();

      await MasterCode.findOneAndUpdate(
        {
          code,
        },
        {
          $set: {
            code,
            masterCode,
            description,
            codeValue,
            codeSubValue,
            isUse,
          },
        }
      );

      return NextResponse.json("성공");
    } catch (e: any) {
      return serverErrorResponse(e);
    }
  });
}
