import { customersDefaultValue, ICustomer } from "./ICustomer";

export interface IBooking {
  _id: string;
  date: number;
  sittingTime: string;
  clientId: ICustomer;
}

export interface IBookingResponse {
  data: IBooking[];
}

//Hur bör denna se ut?

export const bookingsDefaultValue: IBooking = {
  _id: "",
  date: 0,
  sittingTime: "",
  clientId: customersDefaultValue,
};
