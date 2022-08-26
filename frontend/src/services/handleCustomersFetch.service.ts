import { ICustomerResponse, ICustomersResponse } from "../models/ICustomer";
import { get, post, put } from "./handleAxiosRequests.service";

export async function fetchCustomers(): Promise<ICustomersResponse> {
  const response: string = `${process.env.REACT_APP_CUSTOMERS_URI}`;
  return (await get<ICustomersResponse>(response)).data;
}

export async function postCustomer(): Promise<ICustomerResponse> {
  const response: string = `${process.env.REACT_APP_CUSTOMERS_POST}`;
  return (await post<ICustomerResponse>(response)).data;
}

export async function fetchCustomerByID(
  id: string
): Promise<ICustomerResponse> {
  const response: string = `${process.env.REACT_APP_CUSTOMERS_URI}/` + id;

  return (await get<ICustomerResponse>(response)).data;
}
export async function deleteCustomer(id: string): Promise<ICustomerResponse> {
  const response: string = `${process.env.REACT_APP_CUSTOMERS_DELETE}/` + id;
  return (await post<ICustomerResponse>(response)).data;
}

export async function editCustomer(id: string): Promise<ICustomerResponse> {
  const response: string = `${process.env.REACT_APP_BOOKINGS_EDIT}/` + id;
  return (await put<ICustomerResponse>(response)).data;
}
