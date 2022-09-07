import {
  IBooking,
  IBookingResponse,
  IBookingsResponse,
  INewBooking,
} from "../models/IBooking";
import { get, post, put, axiosDelete } from "./handleAxiosRequests.service";

export async function fetchBookings(): Promise<IBookingsResponse> {
  const url: string = `${process.env.REACT_APP_BOOKINGS_URI}`;
  return (await get<IBookingsResponse>(url)).data;
}

export async function postBooking(booking: INewBooking) {
  const url: string = `${process.env.REACT_APP_BOOKINGS_POST}`;
  return (await post<IBookingResponse, INewBooking>(url, booking)).data;
}

export async function fetchBookingByID(id: string): Promise<IBookingResponse> {
  const url: string = `${process.env.REACT_APP_BOOKINGS_URI}/` + id;
  return (await get<IBookingResponse>(url)).data;
}
export async function deleteBooking(id: string): Promise<IBookingResponse> {
  const url: string = `${process.env.REACT_APP_BOOKINGS_DELETE}/` + id;
  return (await axiosDelete<IBookingResponse>(url)).data;
}
export async function editBooking(
  id: string,
  booking: IBooking
): Promise<IBookingResponse> {
  const url: string = `${process.env.REACT_APP_BOOKINGS_EDIT}/` + id;
  return (await put<IBookingResponse, IBooking>(url, booking)).data;
}

export async function findBookingByEmail(
  email: string
): Promise<IBookingResponse> {
  const url: string = `${process.env.REACT_APP_BOOKINGS_URI}/` + email;
  return (await get<IBookingResponse>(url)).data;
}
