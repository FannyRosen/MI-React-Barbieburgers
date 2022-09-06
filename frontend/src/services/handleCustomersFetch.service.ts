import {
  ICustomer,
  ICustomerResponse,
  ICustomersResponse,
  INewCustomer,
} from "../models/ICustomer";
import { get, post, put, axiosDelete } from "./handleAxiosRequests.service";

export async function fetchCustomers(): Promise<ICustomersResponse> {
  const response: string = `${process.env.REACT_APP_CUSTOMERS_URI}`;
  return (await get<ICustomersResponse>(response)).data;
}

export async function postCustomer(
  customer: INewCustomer
): Promise<ICustomerResponse> {
  const response: string = `${process.env.REACT_APP_BOOKINGS_POST}`;
  return (await post<ICustomerResponse, INewCustomer>(response, customer)).data;
}

export async function fetchCustomerByID(
  id: string
): Promise<ICustomerResponse> {
  const response: string = `${process.env.REACT_APP_CUSTOMERS_URI}/` + id;

  return (await get<ICustomerResponse>(response)).data;
}
export async function deleteCustomer(id: string): Promise<ICustomerResponse> {
  const response: string = `${process.env.REACT_APP_CUSTOMERS_DELETE}/` + id;
  return (await axiosDelete<ICustomerResponse>(response)).data;
}

export async function editCustomer(
  id: string,
  customer: INewCustomer
): Promise<ICustomerResponse> {
  const response: string = `${process.env.REACT_APP_CUSTOMERS_EDIT}/` + id;
  return (await put<ICustomerResponse, INewCustomer>(response, customer)).data;
}
