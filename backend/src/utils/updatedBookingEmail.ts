import { IBooking } from "src/models/IBooking";
import nodemailer from "nodemailer";
import { ICustomer } from "src/models/ICustomer";

export const updatedBookingEmail = (booking: IBooking, customer: ICustomer) => {
  const contactEmail = nodemailer.createTransport({
    service: process.env.SERVICE_EMAIL,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PSW,
    },
  });

  const mail = {
    from: "barbieburgerssthlm@gmail.com",
    to: customer.email,
    subject: "Your booking has been updated",
    text: `Your booking at ${booking.date} at Barbie Burgers is canceled`,
    html: `Hello ${customer.name}!
            Your reservation on ${booking.date.toLocaleDateString()} for ${
      booking.numberOfPeople
    } people is bleddy updated ${
      booking.sittingTime == 1 ? "6.00 pm" : "9.00pm"
    } at Barbie Burgers is updated.<br/>
            <span>Would you like to make a new booking? Follow this <a href="http://localhost:3000/book">link</a></span>`,
  };

  contactEmail.sendMail(mail, (error: any) => {
    if (error) {
      return { status: "ERROR" };
    } else {
      return { status: "SENT" };
    }
  });
};
