import { dbConnect } from "@/lib/mongodb";
import { DBMasterCode, MasterCode } from "@/models/masterCode.model";

export enum MASTER_CODE_ENUM {
  WORK_TYPE = "H01",
  연차수량 = "H10",
  TEAM_CODE = "H02",
}
export async function getMasterCodeOf(masterCode: MASTER_CODE_ENUM) {
  await dbConnect();

  return MasterCode.find<DBMasterCode>({
    masterCode: masterCode,
    isUse: true,
  }).select("-_id -createdAt -updatedAt");
}

export async function getMasterCodeList() {
  await dbConnect();

  return MasterCode.find<DBMasterCode>()
    .select("-_id -createdAt -updatedAt")
    .sort({ masterCode: "asc" })
    .lean();
}
