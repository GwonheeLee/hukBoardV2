import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/lib/mongodb";
import { LoginCode } from "@/models/loginCode.model";
import { Member } from "@/models/member.model";
import { NextAuthOptions } from "next-auth";
import { AuthUser, getAuthMember } from "@/service/member";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "I need... Email",
        },
        code: { label: "Token", type: "text", placeholder: "GoGo Email ~" },
      },
      async authorize(credentials) {
        await dbConnect();
        const { email, code } = credentials!;
        const loginCode = await LoginCode.findOne({ email: email });

        if (loginCode && code === loginCode.code) {
          const diffSecond = parseInt(
            (
              (new Date().getTime() - new Date(loginCode.updatedAt).getTime()) /
              1000
            ).toString()
          );
          // 로그인코드가 30분 지난 코드면 invalid
          if (diffSecond > 30 * 60) {
            return null;
          }
          const member = await getAuthMember(email);

          return member;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ url }) {
      return new URL(url).origin;
    },
    async signIn(user) {
      if (!user.user.email) {
        return false;
      }

      return true;
    },
    async session({ session, token }) {
      const user = session.user;
      if (user) {
        session.user = {
          ...user,
          isAdmin: token.isAdmin,
          teamCode: token.teamCode,
          workType: token.workType,
          slackUID: token.slackUID,
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
        token.teamCode = user.teamCode;
        token.workType = user.workType;
        token.slackUID = user.slackUID;
      }
      return token;
    },
  },
  pages: { signIn: "/signIn" },
};
