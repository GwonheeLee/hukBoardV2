import { DBMember } from "./../../../../models/member.model";
import { config } from "@/lib/config";
import { dbConnect } from "@/lib/mongodb";
import { LoginCode } from "@/models/loginCode.model";
import { Member } from "@/models/member.model";
import { NextAuthOptions, Session, Theme } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
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
      async authorize(credentials, req) {
        await dbConnect();
        const { email, code } = credentials!;
        const loginCode = await LoginCode.findOne({ email: email });

        if (loginCode && code === loginCode.code) {
          const member = await Member.findOne({ email: email });
          return member;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: any }) {
      const user = session.user;

      if (user) {
        session.user = {
          ...user,
          isAdmin: token.isAdmin,
        };
      }

      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
  },
  pages: { signIn: "/signIn" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
