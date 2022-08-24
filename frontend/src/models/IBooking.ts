import { customersDefaultValue, ICustomer } from "./ICustomer";

export interface IBooking {
  _id: string;
  date: number;
  sittingTime: string;
  numberOfPeople: number;
  clientId: ICustomer;
}

export interface IBookingsResponse {
  data: IBooking[];
}

export interface IBookingResponse {
  data: IBooking;
}

export const bookingsDefaultValue: IBooking = {
  _id: "",
  date: 0,
  sittingTime: "",
  clientId: customersDefaultValue,
  numberOfPeople: 0,
};
