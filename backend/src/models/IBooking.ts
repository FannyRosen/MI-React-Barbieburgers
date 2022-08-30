import { ObjectId } from "mongoose";

export interface IBooking {
  _id: ObjectId;
  date: string;
  numberOfPeople: number;
  sittingTime: number;
  clientId: ObjectId;
}
