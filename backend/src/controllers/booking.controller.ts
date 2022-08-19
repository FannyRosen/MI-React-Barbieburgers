import { Request, Response } from "express";
import { CustomerModel } from "../models/Customer.model";
import { BookingModel } from "../models/Booking.model";
import { post_newCustomerController } from "./customer.controller";
import { ObjectId } from "mongoose";

const statusSuccess = "Success";
const statusFailed = "Failed";

export const get_bookingsController = async (req: Request, res: Response) => {
  const bookings = await BookingModel.find();

  try {
    res.status(200).json({
      status: statusSuccess,
      message: "Hämta alla bokningar fungerar",
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
  console.log(bookings);
};

export const post_newBookingsController = async (
  req: Request,
  res: Response
) => {
  try {
    ///////////////////////////////////////
    // Koden nedan gör det vi vill att den ska,
    // alltså lägga till namn och email på bokningen
    // Samt separerar bokningen till en collection och
    // kunden till kundens collection
    /* 
    let { name, email } = req.body;
    const postCustomer = new CustomerModel({
      name: name,
      email: email,
    });
    const saveCustomerToDB = await postCustomer.save(); */
    ///////////////////////////////////////

    const postCustomer = async (_id: ObjectId) => {
      post_newCustomerController;
    };

    let { date, sittingTime, numberOfPeople } = req.body;

    const postNewBooking = new BookingModel({
      date: date,
      sittingTime: sittingTime,
      numberOfPeople: numberOfPeople,
      // clientId: saveCustomerToDB._id,

      clientId: await postCustomer(req.body.clientId), //Vill att denna gör
      // samma som det utkommenterade ovan
      // men via customer.controller.ts
    });

    const saveBookingToDB = await postNewBooking.save();

    res.status(200).json({
      status: statusSuccess,
      message: "New booking added to DB",
      data: saveBookingToDB,
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};
