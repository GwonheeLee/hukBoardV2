import { convertObjectId, dbConnect } from "@/lib/mongodb";
import { Annual, DBAnnual } from "@/models/annual.model";
import { DBMember, Member } from "@/models/member.model";
import { regEmail, regYear } from "@/utils/regex";
import { MASTER_CODE_ENUM, getMasterCodeOf } from "./masterCode";
import { getUseAnnualCountOf } from "./eventHistory";

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

export async function createAnnual(member: DBMember, baseYear: string) {
  try {
    await dbConnect();

    const prevBaseYear = (+baseYear - 1).toString();

    const curAnnual = await getAnnualOf(member.email, baseYear);

    if (curAnnual) {
      return { result: false, name: member.name };
    }
    const prevAnnual = await getAnnualOf(member.email, prevBaseYear);

    const useAnnualCount = await getUseAnnualCountOf(member.email, baseYear);

    const newAnnual: Omit<DBAnnual, "id"> = {
      baseYear: baseYear,
      email: member.email,
      annualCount: await getAnnualCount(member.enterDate, baseYear),
      useAnnualCount: useAnnualCount,
      prevUseAnnualCount: prevAnnual
        ? prevAnnual.annualCount -
            prevAnnual.useAnnualCount -
            prevAnnual.prevUseAnnualCount >=
          0
          ? 0
          : Math.abs(
              prevAnnual.annualCount -
                prevAnnual.useAnnualCount -
                prevAnnual.prevUseAnnualCount
            )
        : 0,
    };

    await Annual.create(newAnnual);
    return { result: true, name: member.name };
  } catch {
    return { result: false, name: member.name };
  }
}

async function getAnnualCount(enterDate: string, baseYear: string) {
  const date = new Date(enterDate);

  // 신규 입사자
  if (+baseYear === date.getFullYear()) {
    return 11 - date.getMonth();
  }

  const annualMasterCodeList = await getMasterCodeOf(MASTER_CODE_ENUM.연차수량);

  const yearDiff = +baseYear - date.getFullYear();

  const 연차정보 = annualMasterCodeList.find((i) => +i.codeValue === yearDiff);

  if (!연차정보) {
    throw new Error(`${yearDiff}년차에 대한 정보가 MasterCode에 없습니다.`);
  }

  return +연차정보.codeSubValue;
}
