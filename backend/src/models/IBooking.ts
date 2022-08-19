import { ObjectId } from "mongoose";

export interface IBooking {
  _id: ObjectId;
  date: Date;
  sittingTime: string;
  numberOfPeople: number;
  clientId: ObjectId;
}
