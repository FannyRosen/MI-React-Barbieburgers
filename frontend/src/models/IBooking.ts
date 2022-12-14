import { customersDefaultValue, ICustomer } from "./ICustomer";

export interface IBooking {
  _id?: string;
  date: Date;
  sittingTime: number;
  numberOfPeople: number;
  clientId?: ICustomer;
}

export interface INewBooking {
  date: Date;
  sittingTime: number;
  numberOfPeople: number;
  name: string;
  email: string;
  phone: string;
}
export interface IBookingsResponse {
  data: IBooking[];
}

export interface IBookingResponse {
  data: IBooking;
}

export const bookingsDefaultValue: IBooking = {
  _id: "",
  date: new Date(),
  sittingTime: 0,
  clientId: customersDefaultValue,
  numberOfPeople: 0,
};
