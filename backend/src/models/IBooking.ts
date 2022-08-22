import { ObjectId } from "mongoose";

export interface IBooking {
  _id: ObjectId;
  date: Date;
  numberOfPeople: number;
  sittingTime: string;
  numberOfPeople: number;
  clientId: ObjectId;
}
