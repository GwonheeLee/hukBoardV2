import { ObjectId } from "mongoose";

export type AuthUser = {
  email: string;
  name: string;
  isAdmin: boolean;
};

export type SearchMember = AuthUser & {
  resignDate: string;
};

export type DBMember = SearchMember & {
  _id: ObjectId;
  workType: string;
  enterDate: string;
  birthDay: string;
  phone: string;
  slackUID: string;
};
