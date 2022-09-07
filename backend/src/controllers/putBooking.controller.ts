require("dotenv").config();
import { Request, Response } from "express";
import { BookingModel } from "../models/Booking.model";
import { statusFailed, statusSuccess } from "./statusMessages";
import { sendConfirmationEmail } from "../utils/confirmationEmail";

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

    await BookingModel.findByIdAndUpdate(req.params.id, newBooking);
    res.status(200).json({
      status: statusSuccess,
      message: "Edit booking works",
      data: req.params.id,
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};
