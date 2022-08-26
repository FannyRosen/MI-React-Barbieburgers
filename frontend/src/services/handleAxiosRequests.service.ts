import axios from "axios";

export async function get<T>(url: string) {
  return await axios.get<T>(url);
}

export async function post<T>(url: string) {
  return await axios.post<T>(url);
}

export async function put<T>(url: string) {
  return await axios.put<T>(url);
}
