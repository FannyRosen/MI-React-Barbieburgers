import { ICustomer } from "./ICustomer";

export interface IBooking {
  _id?: string;
  date: Date;
  numberOfPeople: number;
  sittingTime?: string;
  clientId?: ICustomer;
}
