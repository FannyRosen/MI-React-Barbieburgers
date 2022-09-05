import mongoose from "mongoose";
import { ICustomer } from "./ICustomer";

const CustomerSchema = new mongoose.Schema<ICustomer>({
  name: {
    type: String,
    lowercase: true,
    // required: true,
  },
  email: {
    type: String,
    lowercase: true,
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
