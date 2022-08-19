import { ICustomer } from "./ICustomer";

export interface IBooking {
  _id: string;
  date: Date;
  sittingTime: string;
  clientId: ICustomer;
}
