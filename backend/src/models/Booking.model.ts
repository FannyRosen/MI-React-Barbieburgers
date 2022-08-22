import mongoose from "mongoose";
import { IBooking } from "./IBooking";

const BookingSchema = new mongoose.Schema<IBooking>({
  date: {
    type: Date,
    // required: true,
  },
  sittingTime: {
    type: String,
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
