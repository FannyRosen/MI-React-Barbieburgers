export interface ICustomer {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ICustomerResponse {
  data: ICustomer[];
}
