import mongoose from "mongoose";
import { ICustomer } from "./ICustomer";

const CustomerSchema = new mongoose.Schema<ICustomer>({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
});

export const CustomerModel = mongoose.model<ICustomer>(
  "Customers",
  CustomerSchema
);
