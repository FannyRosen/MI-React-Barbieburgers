import { IBooking } from "src/models/IBooking";
import nodemailer from "nodemailer";
import { ICustomer } from "src/models/ICustomer";

export const sendConfirmationEmail = (
  booking: IBooking,
  customer: ICustomer
) => {
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

  const mail = {
    from: "barbieburgerssthlm@gmail.com",
    to: customer.email,
    subject: "Your booking",
    text: "Your booking at Barbie Burgers is confirmed",
    html: `Hello ${customer.name} din gullis!
          Your reservation for ${
            booking.numberOfPeople
          } people at Barbie Burgers is confirmed.<br/>
        Date: ${booking.date.toLocaleDateString()}<br/>
        Time: ${booking.sittingTime == 1 ? "6.00 pm" : "9.00pm"}
          <span>Would you like to cancel?? Follow this <a href="http://localhost:3000/reservation/${
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
