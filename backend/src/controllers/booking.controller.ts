import { Request, Response } from "express";
import { BookingModel } from "../models/Booking.model";

export const get_bookingsController = async (req: Request, res: Response) => {
  const bookings = await BookingModel.find();

  try {
    res.status(200).json({
      status: "Sucess",
      message: "Hämta alla bokningar fungerar",
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Allt gick åt helvete",
    });
  }
  console.log(bookings);
};
