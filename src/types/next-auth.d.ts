import { AuthUser } from "./member";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
  interface User extends AuthUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    name: string;
    workType: string;
    teamCode: string;
    isAdmin: boolean;
    slackUID: string;
  }
}
