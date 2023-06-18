import { ObjectId } from "mongoose";

export type AuthUser = {
  email: string;
  name: string;
  isAdmin: boolean;
};

export type SearchMember = Omit<DBMember, "_id" | "slackUID">;
export type DBMember = AuthUser & {
  _id: ObjectId;
  workType: string;
  enterDate: string;
  birthDay: string;
  phone: string;
  resignDate: string;
  slackUID: string;
};
