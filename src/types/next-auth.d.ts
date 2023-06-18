export type AuthUser = {
  email: string;
  name: string;
  isAdmin: boolean;
};
declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}
