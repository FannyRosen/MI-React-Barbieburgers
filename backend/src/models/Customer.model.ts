import mongoose from "mongoose";
import { ICustomer } from "./ICustomer";

const CustomerSchema = new mongoose.Schema<ICustomer>({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
    // required: true,
  },
});

export const CustomerModel = mongoose.model<ICustomer>(
  "Customers",
  CustomerSchema
);
