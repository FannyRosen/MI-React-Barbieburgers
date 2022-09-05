import { ObjectId } from "mongoose";

export interface ICustomer {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
}
