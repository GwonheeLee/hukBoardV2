import { dbConnect } from "@/lib/mongodb";
import {
  DBMasterCode,
  MasterCode,
  MasterCodeT,
} from "@/models/masterCode.model";

export enum MASTER_CODE_ENUM {
  WORK_TYPE = "H01",
  연차수량 = "H10",
  TEAM_CODE = "H02",
}
export async function getMasterCodeOf(
  masterCode: MASTER_CODE_ENUM
): Promise<MasterCodeT[]> {
  await dbConnect();

  return MasterCode.find({ masterCode: masterCode, isUse: true })
    .select("-_id -createdAt -updatedAt -isUse")
    .lean();
}

export async function getMasterCode(): Promise<Omit<DBMasterCode, "_id">[]> {
  await dbConnect();

  return MasterCode.find().select("-_id -createdAt -updatedAt ").lean();
}
