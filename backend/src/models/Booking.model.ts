import mongoose from "mongoose";
import { IBooking } from "./IBooking";

const BookingSchema = new mongoose.Schema<IBooking>({
  date: { type: Date },
  sittingTime: { type: String },
  numberOfPeople: { type: Number },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
    // required: true,
  },
});

export const BookingModel = mongoose.model<IBooking>("Bookings", BookingSchema);
