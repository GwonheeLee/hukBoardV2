import { Member } from "@/models/member.model";

export async function isExistMember(email: string) {
  const member = await Member.findOne({ email });

  return !!member;
}
