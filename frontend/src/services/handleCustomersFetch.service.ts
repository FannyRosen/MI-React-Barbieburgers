import { ICustomerResponse } from "../models/ICustomer";
import { get, post } from "./handleAxiosRequests.service";

export async function fetchCustomers(): Promise<ICustomerResponse> {
  const response: string = `${process.env.REACT_APP_CUSTOMERS_URI}`;
  return (await get<ICustomerResponse>(response)).data;
}

export async function postCustomer(): Promise<ICustomerResponse> {
  const response: string = `${process.env.REACT_APP_CUSTOMERS_POST}`;
  return (await post<ICustomerResponse>(response)).data;
}

export async function fetchCustomerByID(
  id: string
): Promise<ICustomerResponse> {
  const response: string = `${process.env.REACT_APP_CUSTOMERS_URI}` + id;
  return (await get<ICustomerResponse>(response)).data;
}
