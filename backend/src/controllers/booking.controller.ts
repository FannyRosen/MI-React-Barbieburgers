require("dotenv").config();

import { Request, Response } from "express";
import { CustomerModel } from "../models/Customer.model";
import { BookingModel } from "../models/Booking.model";
import { statusFailed, statusSuccess } from "./statusMessages";
import nodemailer from "nodemailer";
import { IBooking } from "src/models/IBooking";

export async function deleteOneBooking(req: Request, res: Response) {
  await BookingModel.findByIdAndDelete(req.params.id);
}

export const get_bookingsController = async (req: Request, res: Response) => {
  const bookings = await BookingModel.find();

  try {
    res.status(200).json({
      status: statusSuccess,
      message: "Hämta alla bokningar fungerar",
      data: bookings,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};

export const post_newBookingsController = async (
  req: Request,
  res: Response
) => {
  try {
    let { date, sittingTime, numberOfPeople, name, email, phone } = req.body;

    let checkBookings = await BookingModel.find({
      date,
      sittingTime,
    }).lean();

    let maximumNumberOfBookings: number = 2;

    let tables: number = checkBookings.length;

    for (let i = 0; i < checkBookings.length; i++) {
      if (checkBookings[i].numberOfPeople > 6) {
        tables = tables + 1;
      }
    }

    if (
      tables >= maximumNumberOfBookings ||
      (numberOfPeople > 6 && tables >= maximumNumberOfBookings - 1)
    ) {
      return res.status(404).json({
        status: statusFailed,
        message: "FULLY BOOKED",
      });
    }

    const returningCustomer = await CustomerModel.findOne({
      email,
      phone,
    });

    const sendConfirmationEmail = (booking: IBooking) => {
      const contactEmail = nodemailer.createTransport({
        service: process.env.SERVICE_EMAIL,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PSW,
        },
      });

      contactEmail.verify((error: any) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Confirmation sent");
        }
      });

      if (sittingTime === 1) {
        sittingTime = "06:00pm";
      } else if (sittingTime === 2) {
        sittingTime = "09:00pm";
      }

      const mail = {
        from: name,
        to: email,
        subject: "Your booking at barbieburgers",
        html: `<p>Hello ${name}! </p>
          <span>Your reservation for ${numberOfPeople} people hos oss på barbie burgers datum: ${date} klockan: ${sittingTime} är nu bokad!</span>
          <span>Vill du avboka? Följ länken <a href="http://localhost:3000/admin/${booking._id}">här</a></span>`,
      };

      contactEmail.sendMail(mail, (error: any) => {
        if (error) {
          res.json({ status: "ERROR" });
        } else {
          res.json({ status: "SENT" });
        }
      });
    };

    if (returningCustomer) {
      const saveCustomerId = await returningCustomer.save();

      const postNewBooking = new BookingModel({
        date,
        sittingTime,
        numberOfPeople,
        clientId: saveCustomerId._id,
      });

      let booking = await postNewBooking.save();
      sendConfirmationEmail(booking);
    } else {
      const postCustomer = new CustomerModel({
        name,
        email,
        phone,
      });

      const saveCustomerToDB = await postCustomer.save();

      const postNewBooking = new BookingModel({
        date,
        sittingTime,
        numberOfPeople,
        clientId: saveCustomerToDB._id,
      });

      let booking = await postNewBooking.save();
      sendConfirmationEmail(booking);
    }

    res.status(200).json({
      status: statusSuccess,
      message: "New booking added to DB",
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
      status: statusSuccess,
      message: "Get id works",
      data: bookingById,
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};

export const delete_bookingByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    res.status(200).json({
      status: statusSuccess,
      message: "Delete booking works",
      data: deleteOneBooking(req, res),
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};

export const put_bookingByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    let { date, sittingTime, numberOfPeople } = req.body;

    const editBooking = await BookingModel.findByIdAndUpdate(req.params.id);

    editBooking.sittingTime = sittingTime;
    editBooking.date = date;
    editBooking.numberOfPeople = numberOfPeople;

    await editBooking.save();

    res.status(200).json({
      status: statusSuccess,
      message: "Edit booking works",
      data: editBooking,
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};
