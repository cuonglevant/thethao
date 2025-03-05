import type { User } from "./userTypes";
import type { Media } from "./mediaTypes";
import type { Category } from "./categoryTypes";

export type Comment = {
  content: string;
  slug: string;
  author: User;
  publishDate: Date;
};

export type Content = {
  _id: string;
  title: string;
  content: string;
  description: string;
  publishDate?: Date | undefined;
  author: User[];
  media: Media[];
  comment: Comment[];
  category: Category;
  numOfViews: number;
  slug: string;
};
