export interface ICustomer {
  _id: string;
  name: string;
  email: string;
  phone: string;
}
export interface INewCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface ICustomersResponse {
  data: ICustomer[];
}

export interface ICustomerResponse {
  data: ICustomer;
}

export const customersDefaultValue: ICustomer = {
  _id: "",
  name: "",
  email: "",
  phone: "",
};

export interface IFormCustomer {
  name: string;
  email: string;
  phone: string;
}

export const formCustomersDefaultValue: IFormCustomer = {
  name: "",
  email: "",
  phone: "",
};
