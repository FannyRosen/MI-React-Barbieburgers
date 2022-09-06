import {
  IBooking,
  IBookingResponse,
  IBookingsResponse,
  INewBooking,
} from "../models/IBooking";
import { get, post, put, axiosDelete } from "./handleAxiosRequests.service";

export async function fetchBookings(): Promise<IBookingsResponse> {
  const response: string = `${process.env.REACT_APP_BOOKINGS_URI}`;
  return (await get<IBookingsResponse>(response)).data;
}

export async function postBooking(
  booking: INewBooking
): Promise<IBookingResponse> {
  const response: string = `${process.env.REACT_APP_BOOKINGS_POST}`;
  return (await post<IBookingResponse, INewBooking>(response, booking)).data;
}

export async function fetchBookingByID(id: string): Promise<IBookingResponse> {
  const response: string = `${process.env.REACT_APP_BOOKINGS_URI}/` + id;
  return (await get<IBookingResponse>(response)).data;
}
export async function deleteBooking(id: string): Promise<IBookingResponse> {
  const response: string = `${process.env.REACT_APP_BOOKINGS_DELETE}/` + id;
  return (await axiosDelete<IBookingResponse>(response)).data;
}
export async function editBooking(
  id: string,
  booking: IBooking
): Promise<IBookingResponse> {
  const response: string = `${process.env.REACT_APP_BOOKINGS_EDIT}/` + id;
  return (await put<IBookingResponse, IBooking>(response, booking)).data;
}

export async function findBookingByEmail(
  email: string
): Promise<IBookingResponse> {
  const response: string = `${process.env.REACT_APP_BOOKINGS_URI}/` + email;
  return (await get<IBookingResponse>(response)).data;
}
