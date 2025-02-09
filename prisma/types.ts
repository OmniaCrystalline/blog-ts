/** @format */

export interface IAccount {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  user: IUser;
}

export interface ISession {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: IUser;
}

export interface IUser {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  accounts: IAccount[];
  sessions: ISession[];
  post: IPost[];
  comments: IComment[];
}

export interface IVerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface ICategory {
  id: string;
  slug: string;
  title: string;
  img?: string;
  posts: IPost[];
  color: string;
}

export interface IPost {
  id: string;
  createdAt: Date;
  slug: string;
  title: string;
  desc: string;
  img?: string;
  views: number;
  catSlag: string;
  cat: ICategory;
  userEmail: string;
  user: IUser;
  comments: IComment[];
}

export interface IComment {
  id: string;
  createdAt: Date;
  desc: string;
  userEmail: string;
  user: IUser;
  postSlug: string;
  post: IPost;
}
