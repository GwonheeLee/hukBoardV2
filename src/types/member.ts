import { ObjectId } from "mongoose";

export type AuthUser = {
  email: string;
  name: string;
  workType: string;
  teamCode: string;
  isAdmin: boolean;
  slackUID: string;
};

export type SearchMember = AuthUser & {
  resignDate?: string | null;
};

export type DBMember = SearchMember & {
  _id: ObjectId;
  enterDate: string;
  birthDay: string;
  phone: string;
};
