import {User} from "./User";

export interface Issue {
  id: number,
  title: string,
  created_at: string,
  body: string,
  user:User,
  number:number,
  text:string;
}
