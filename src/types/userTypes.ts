import { Content } from "./contentTypes";

export type Role = {
  _id: string;
  name: string;
  // Add other role fields as needed
};

export type User = {
  _id: string;
  username: string;
  dob?: Date;
  email?: string;
  password?: string;
  phoneNumber?: string;
  idCard?: string;
  userImage?: string;
  roles?: Role;
  viewedContent?: Content[];
};
