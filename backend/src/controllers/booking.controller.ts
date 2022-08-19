import { Request, Response } from "express";
import { CustomerModel } from "../models/Customer.model";
import { BookingModel } from "../models/Booking.model";

const statusSuccess = "Success";
const statusFailed = "Failed";

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

export const post_newBookingsController = async (
  req: Request,
  res: Response
) => {
  try {
    /*     let { name, email } = req.body;
    const postCustomer = new CustomerModel({
      name: name,
      email: email,
    });
    const saveCustomerToDB = await postCustomer.save();
 */
    let { date, sittingTime, clientId } = req.body;
    const postNewBooking = new BookingModel({
      date: date,
      sittingTime: sittingTime,
      // clientId: saveCustomerToDB._id,
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
