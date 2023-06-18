import { AuthUser } from "./member";
declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}
