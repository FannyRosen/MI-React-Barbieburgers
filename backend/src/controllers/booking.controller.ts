require("dotenv").config();

import { Request, Response } from "express";
import { CustomerModel } from "../models/Customer.model";
import { BookingModel } from "../models/Booking.model";
import { statusFailed, statusSuccess } from "./statusMessages";
import nodemailer from "nodemailer";

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
    /////////////////////////
    // EMAIL SETUP
    /////////////////////////
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
        console.log("Ready to send.");
      }
    });

    /////////////////////////
    // Om mindre än <= 6 personer POST en gång,
    // om >= 6 och max 12 personer POST två gånger
    let numberOfPeopleBooked = (
      await CustomerModel.find({
        numberOfPeople: req.body.numberOfPeople,
      }).lean()
    ).length;

    let checkBookings: number = (
      await BookingModel.find({
        date: req.body.date,
        sittingTime: req.body.sittingTime,
      }).lean()
    ).length;

    let maximumNumberOfBookings: number = 2; // MAX ANTAL BOKNINGAR/BORD OCH SITTNING
    let addone: number = checkBookings++;

    if (checkBookings > maximumNumberOfBookings) {
      addone;

      return res.status(200).json({
        status: statusFailed,
        message: "Fullbokat, so sorry!",
      });
    }

    const returningCustomer = await CustomerModel.findOne({
      email: req.body.email,
      numberOfPeople: req.body.numberOfPeople,
      phone: req.body.phone,
    });

    if (returningCustomer) {
      const saveCustomerId = await returningCustomer.save();

      let { date, sittingTime, numberOfPeople } = req.body;

      const postNewBooking = new BookingModel({
        date: date,
        sittingTime: sittingTime,
        numberOfPeople: numberOfPeople,
        clientId: saveCustomerId._id,
      });

      await postNewBooking.save();

      /////////////////////////
      // BEKRÄFTELSE MAIL PÅ BOKNING. GÖRA TILL EGEN FUNKTION? FÖR ATT SNYGGA UPP
      /////////////////////////
      let bookingid = await BookingModel.findById(req.params._id); // BLIR NULL, FIX

      const mail = {
        from: req.body.name,
        to: req.body.email,
        html: `<p>Hej ${req.body.name}! </p>
        Embedded image: <img src="../../../frontend/src/assets/bb-logo.png"/>
        
        <span>Din reservation för ${req.body.numberOfPeople} personer hos oss på barbie burgers datum: ${req.body.date} klockan: ${req.body.sittingTime} är nu bokad!</span>
        <span>Vill du avboka? Följ länken <a href="http://localhost:3000/admin/${bookingid}">här</a></span>`,
      };
      contactEmail.sendMail(mail, (error: any) => {
        if (error) {
          res.json({ status: "ERROR" });
        } else {
          res.json({ status: "SENT" });
        }
      });
    } else {
      /////////////////////////
      // FINNS INTE KUND I DATBASEN? => SKAPA NY KUND
      /////////////////////////

      let { name, email, phone } = req.body;

      const postCustomer = new CustomerModel({
        name: name,
        email: email,
        phone: phone,
      });

      const saveCustomerToDB = await postCustomer.save();

      let { date, sittingTime, numberOfPeople } = req.body;

      const postNewBooking = new BookingModel({
        date: date,
        sittingTime: sittingTime,
        numberOfPeople: numberOfPeople,
        clientId: saveCustomerToDB._id,
      });

      await postNewBooking.save();
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
    // const deleteBooking = await BookingModel.findByIdAndDelete(req.params.id);

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
    const editBooking = await BookingModel.findByIdAndUpdate(req.params.id);

    editBooking.sittingTime = req.body.sittingTime;
    editBooking.date = req.body.date;
    editBooking.numberOfPeople = req.body.numberOfPeople;

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
