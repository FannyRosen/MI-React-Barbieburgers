require("dotenv").config();
import { Request, Response } from "express";
import { CustomerModel } from "../models/Customer.model";
import { updatedBookingEmail } from "../utils/updatedBookingEmail";
import { BookingModel } from "../models/Booking.model";
import { statusFailed, statusSuccess } from "./statusMessages";

export const put_bookingByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    let { date, sittingTime, numberOfPeople } = await req.body;
    console.log(date);
    console.log(sittingTime);
    console.log(numberOfPeople);

    let newBooking = {
      date,
      sittingTime,
      numberOfPeople,
    };

    const updatedBooking = await BookingModel.findByIdAndUpdate(
      req.params.id,
      newBooking
    );

    const findCustomer = await CustomerModel.findOne(req.body.email);
    const findUpdatedBooking = await BookingModel.findOne(newBooking);

    console.log(findUpdatedBooking);

    updatedBookingEmail(findUpdatedBooking, findCustomer);

    res.status(200).json({
      status: statusSuccess,
      message: "Edit booking works",
      data: updatedBooking,
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};
