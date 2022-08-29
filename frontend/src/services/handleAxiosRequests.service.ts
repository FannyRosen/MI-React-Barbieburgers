import axios from "axios";
import { INewBooking } from "../models/IBooking";

export async function get<T>(url: string) {
  return await axios.get<T>(url);
}

export async function post<T, S>(url: string, data: S) {
  return await axios.post<T>(url, data);
}

export async function put<T>(url: string) {
  return await axios.put<T>(url);
}

export async function axiosDelete<T>(url: string) {
  return await axios.post<T>(url);
}
