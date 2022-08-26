import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { bookingsDefaultValue, IBooking } from "../models/IBooking";
import { customersDefaultValue, ICustomer } from "../models/ICustomer";
import {
  deleteBooking,
  fetchBookingByID,
} from "../services/handleBookingsFetch.service";
import { fetchCustomerByID } from "../services/handleCustomersFetch.service";

export const SingleBooking = () => {
  const [bookingById, setBookingById] =
    useState<IBooking>(bookingsDefaultValue);
  const [customerById, setCustomerById] = useState<ICustomer>(
    customersDefaultValue
  );

  let params = useParams();
  //Försök göra utan en fetch, props?
  useEffect(() => {
    fetchCustomerByID(customerById._id)
      .then(async (customerByIdResponse) => {
        setCustomerById(customerByIdResponse.data);
        console.log(customerByIdResponse);

        if (customerByIdResponse.data._id === bookingById.clientId.toString()) {
          console.log("stämmer");
        } else {
          console.log("fel");
        }

        const bookingsByIdResponse = await fetchBookingByID(params.id!);
        setBookingById(bookingsByIdResponse.data);
        console.log(bookingsByIdResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookingById.clientId, customerById._id, params]); // håll kanske tom []

  return (
    <>
      SingleBooking works!
      <p>CUSTOMERS NAME</p>
      <p>{customerById._id}</p>
      <Link to={"/admin/customers/"}>
        <button>GO TO CUSTOMER</button>
      </Link>
      <p>DATE OF SITTING {bookingById.date.toLocaleString()}</p>
      <p>WHICH SITTING {bookingById.sittingTime}</p>
      <p>PEOPLE ON RESERVATION {bookingById.numberOfPeople}</p>
      <button>Edit</button>
      <button onClick={() => deleteBooking(bookingById._id)}>
        <Link to={"/admin"}>Delete</Link>
      </button>
    </>
  );
};
