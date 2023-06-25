import { convertObjectId, dbConnect } from "@/lib/mongodb";
import { Annual, DBAnnual } from "@/models/annual.model";
import { Member } from "@/models/member.model";
import { regEmail, regYear } from "@/utils/regex";

export type SearchAnnual = DBAnnual & {
  name: string;
};
export async function getAnnualListOf(
  baseYear: string
): Promise<SearchAnnual[]> {
  if (regYear.test(baseYear) === false) {
    throw new Error(`${baseYear}은 올바른 yyyy 형식이 아닙니다.`);
  }

  await dbConnect();

  const annulals: DBAnnual[] = (
    await Annual.find({ baseYear }).select("-createdAt -updatedAt").lean()
  ).map(convertObjectId);

  const members = await Member.find({}).lean();

  return annulals.map((a) => ({
    ...a,
    name: members.find((m) => m.email === a.email)?.name ?? "Unknown",
  }));
}

export async function getAnnualOf(
  email: string,
  baseYear: string
): Promise<SearchAnnual | null> {
  if (regYear.test(baseYear) === false || regEmail.test(email) === false) {
    throw new Error("인자값 잘못됨 확인 해보삼");
  }

  await dbConnect();

  const annual = await Annual.findOne({ baseYear, email }).lean();

  if (!annual) {
    return null;
  }

  const member = await Member.findOne({ email: annual.email }).lean();

  return {
    ...annual,
    name: member?.name ?? "Unknown",
  };
}

export async function updateAnnual(annual: DBAnnual) {
  await dbConnect();

  return Annual.findByIdAndUpdate(annual.id, {
    $set: { ...annual },
  }).lean();
}
