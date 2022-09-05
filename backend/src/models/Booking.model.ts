import mongoose from "mongoose";
import { IBooking } from "./IBooking";

const BookingSchema = new mongoose.Schema<IBooking>({
  date: {
    type: String,
    // required: true,
  },
  sittingTime: {
    type: Number,
    // required: true,
  },
  numberOfPeople: {
    type: Number,
    // required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
    // required: true,
  },
});

export const BookingModel = mongoose.model<IBooking>("Bookings", BookingSchema);
