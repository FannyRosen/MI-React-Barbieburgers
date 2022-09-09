import axios from "axios";

export async function get<T>(url: string) {
  return await axios.get<T>(url);
}

export async function post<T, S>(url: string, data: S) {
  return await axios.post<T>(url, data);
}
export async function put<T, S>(url: string, data: S) {
  return await axios.put<T>(url, data);
}

export async function axiosDelete<T>(url: string) {
  return await axios.post<T>(url);
}
