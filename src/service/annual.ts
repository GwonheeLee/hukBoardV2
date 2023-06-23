import { dbConnect } from "@/lib/mongodb";
import { Annual, DBAnnual } from "@/models/annual.model";
import { regEmail, regYear } from "@/utils/regex";

export async function getAnnualListOf(baseYear: string): Promise<DBAnnual[]> {
  if (regYear.test(baseYear) === false) {
    throw new Error(`${baseYear}은 올바른 yyyy 형식이 아닙니다.`);
  }

  await dbConnect();

  return (
    await Annual.find({ baseYear }).select("-createdAt -updatedAt").lean()
  ).map((i) => {
    i.id = i._id.toHexString();
    delete i._id;

    return i;
  });
}

export async function getAnnualOf(email: string, baseYear: string) {
  if (regYear.test(baseYear) === false || regEmail.test(email) === false) {
    throw new Error("인자값 잘못됨 확인 해보삼");
  }

  await dbConnect();

  return Annual.findOne({ baseYear, email });
}

export async function updateAnnual(annual: DBAnnual) {
  await dbConnect();

  return Annual.findByIdAndUpdate(annual.id, {
    $set: { ...annual },
  });
}
