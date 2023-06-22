import { dbConnect } from "@/lib/mongodb";
import { MasterCode } from "@/models/masterCode.model";

export enum MASTER_CODE_ENUM {
  WORK_TYPE = "H01",
  연차수량 = "H10",
  TEAM_CODE = "H02",
}
export async function getMasterCodeOf(masterCode: MASTER_CODE_ENUM) {
  await dbConnect();

  return MasterCode.find({ masterCode: masterCode, isUse: true })
    .select("-_id -createdAt -updatedAt -isUse")
    .lean();
}

export async function getMasterCode() {
  await dbConnect();

  return MasterCode.find().select("-_id -createdAt -updatedAt");
}
