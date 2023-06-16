import { config } from "@/lib/config";
import { LoginCode } from "@/models/loginCode.model";
import { Member } from "@/models/member.model";
import { NextAuthOptions, Theme } from "next-auth";
import NextAuth from "next-auth/next";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider().
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
        const { email, code } = credentials!;

        const loginCode = await LoginCode.findOne({ email: email });

        if (code === loginCode) {
          const member = await Member.findOne({ email: email });
          return member;
        }

        return null;
      },
    }),
  ],
  callbacks: {},
  pages: {},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
