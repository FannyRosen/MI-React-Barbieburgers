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
    const customer = await CustomerModel.findOne({ email: req.body.email });

    if (customer) {
      let { date, sittingTime, numberOfPeople } = req.body;

      const saveCustomerId = await customer.save();

      const postNewBooking = new BookingModel({
        date: date,
        sittingTime: sittingTime,
        numberOfPeople: numberOfPeople,
        clientId: saveCustomerId._id,
      });

      await postNewBooking.save();
    } else {
      let { name, email } = req.body;

      const postCustomer = new CustomerModel({
        name: name,
        email: email,
      });

      const saveCustomerToDB = await postCustomer.save();

      let { date, sittingTime, numberOfPeople, _id } = req.body;

      const postNewBooking = new BookingModel({
        date: date,
        sittingTime: sittingTime,
        numberOfPeople: numberOfPeople,
        clientId: saveCustomerToDB._id,

        //clientId: await postCustomer(_id), //Vill att denna gör
        // samma som det utkommenterade ovan
        // men via customer.controller.ts
      });

      await postNewBooking.save();
    }

    /* 
    const postCustomer = async (_id: ObjectId) => {
      post_newCustomerController;
    };
 */
    res.status(200).json({
      status: statusSuccess,
      message: "New booking added to DB",
    });
  } catch (error) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};

export const get_bookingByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const bookingById = await BookingModel.findById(req.params.id);

    res.status(200).json({
      status: "Successful",
      message: "Get id works",
      data: bookingById,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "Get id failed",
      message: error,
    });
  }
};

export const delete_bookingByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const deleteBooking = await BookingModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "Successful",
      message: "Delete booking works",
      data: deleteBooking,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "Delete booking failed",
      message: error,
    });
  }
};

export const put_bookingByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const editBooking = await BookingModel.findByIdAndUpdate(req.params.id);

    editBooking.sittingTime = req.body.sittingTime;
    editBooking.date = req.body.date;
    editBooking.numberOfPeople = req.body.numberOfPeople;

    await editBooking.save();

    res.status(200).json({
      status: "Successful",
      message: "Edit booking works",
      data: editBooking,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "Edit booking failed",
      message: error,
    });
  }
};
