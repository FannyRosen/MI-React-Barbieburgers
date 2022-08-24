import { IBookingResponse, IBookingsResponse } from "../models/IBooking";
import { get, post } from "./handleAxiosRequests.service";

export async function fetchBookings(): Promise<IBookingsResponse> {
  const response: string = `${process.env.REACT_APP_BOOKINGS_URI}`;
  return (await get<IBookingsResponse>(response)).data;
}

export async function postBooking(): Promise<IBookingsResponse> {
  const response: string = `${process.env.REACT_APP_BOOKINGS_POST}`;
  return (await post<IBookingsResponse>(response)).data;
}

export async function fetchBookingByID(id: string): Promise<IBookingResponse> {
  const response: string = `${process.env.REACT_APP_BOOKINGS_URI}/` + id;
  return (await get<IBookingResponse>(response)).data;
}
