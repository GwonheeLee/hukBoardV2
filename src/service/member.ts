import { dbConnect } from "@/lib/mongodb";
import { Member } from "@/models/member.model";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  workType: string;
  teamCode: string;
  isAdmin: boolean;
  slackUID: string;
};

export type SearchMember = {
  email: string;
  name: string;
  isAdmin: boolean;
  resignDate?: string | null;
  teamCode: string;
};

export type ScheduleMember = {
  name: string;
  email: string;
  teamCode: string;
};
export async function getMemberList(): Promise<SearchMember[]> {
  await dbConnect();
  return Member.find()
    .select("-_id email name isAdmin resignDate teamCode")
    .lean();
}

export async function getMember(email: string) {
  await dbConnect();

  return Member.findOne({ email }).select("-_id -createdAt -updatedAt").lean();
}

export async function getAuthMember(email: string): Promise<AuthUser | null> {
  await dbConnect();

  return Member.findOne({ email, resignDate: null })
    .select("_id email name workType teamCode isAdmin slackUID")
    .lean()
    .then((i) => {
      if (i) {
        i.id = i._id.toHexString();
        delete i._id;
      }
      return i as AuthUser | null;
    });
}

export async function getMembersForSchedule(
  teamCode?: string
): Promise<ScheduleMember[]> {
  await dbConnect();
  const query = teamCode ? { teamCode } : {};
  return Member.find(query).select("email name teamCode -_id").lean();
}
