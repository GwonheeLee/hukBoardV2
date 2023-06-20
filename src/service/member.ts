import { DBMember, SearchMember } from "./../types/member";
import { dbConnect } from "@/lib/mongodb";
import { Member } from "@/models/member.model";

export async function getMemberList(): Promise<SearchMember[]> {
  await dbConnect();
  return Member.find()
    .select("-_id email name isAdmin resignDate teamCode")
    .lean();
}

export async function getMember(email: string) {
  await dbConnect();

  return Member.findOne({ email }).select("-_id").lean<Omit<DBMember, "_id">>();
}
