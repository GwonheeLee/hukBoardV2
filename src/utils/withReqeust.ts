import { authOptions } from "@/lib/authOption";
import { AuthUser } from "@/service/member";
import { getServerSession } from "next-auth";
import { UnAuthorizedError, serverErrorResponse } from "./errro";

export async function withMember(
  handler: (member: AuthUser) => Promise<Response>
) {
  const session = await getServerSession(authOptions);
  const member = session?.user;

  if (!member) {
    return serverErrorResponse(new UnAuthorizedError("권한이 없습니다."));
  }

  return handler(member);
}

export async function withAdmin(
  handler: (member: AuthUser) => Promise<Response>
) {
  return withMember(async (member: AuthUser) => {
    if (member.isAdmin) {
      return handler(member);
    } else {
      return serverErrorResponse(
        new UnAuthorizedError("관리자 권한이 필요합니다.")
      );
    }
  });
}
