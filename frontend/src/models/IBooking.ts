import { customersDefaultValue, ICustomer } from "./ICustomer";

export interface IBooking {
  _id?: string;
  date: Date;
  numberOfPeople: number;
  sittingTime?: string;
  clientId?: ICustomer;
}

export interface IBookingResponse {
  data: IBooking[];
}
