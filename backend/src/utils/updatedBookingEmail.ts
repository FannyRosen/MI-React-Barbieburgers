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
    text: `Your booking at ${booking.date} at Barbie Burgers has been updated.`,
    html: `Hello ${customer.name}!
            Your reservation on ${booking.date.toLocaleDateString()} for ${
      booking.numberOfPeople
    } people at ${
      booking.sittingTime == 1 ? "6.00 pm" : "9.00pm"
    } is updated.<br/>
             <span>Would you like to cancel?? :( Follow this <a href="http://localhost:3000/reservation/${
               booking._id
             }">link</a></span>`,
  };

  contactEmail.sendMail(mail, (error: any) => {
    if (error) {
      return { status: "ERROR" };
    } else {
      return { status: "SENT" };
    }
  });
};
