import React, { useEffect, useState } from "react";
import { Link, matchRoutes, useLocation, useParams } from "react-router-dom";
import { bookingsDefaultValue, IBooking } from "../models/IBooking";
import { customersDefaultValue, ICustomer } from "../models/ICustomer";
import {
  deleteBooking,
  editBooking,
  fetchBookingByID,
} from "../services/handleBookingsFetch.service";
import { fetchCustomerByID } from "../services/handleCustomersFetch.service";

export const SingleBooking = () => {
  const [bookingById, setBookingById] =
    useState<IBooking>(bookingsDefaultValue);
  const [customerById, setCustomerById] = useState<ICustomer>(
    customersDefaultValue
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

  let params = useParams();
  const location = useLocation();
  const adminPath = location.pathname === "/admin/" + bookingById._id;
  const guestPath = location.pathname === "/reservation/" + bookingById._id;

  useEffect(() => {
    fetchCustomerByID(customerById._id)
      .then(async (customerByIdResponse) => {
        setCustomerById(customerByIdResponse.data);
        console.log(customerByIdResponse);

        if (
          /* customerByIdResponse.data._id === bookingById.clientId.toString() */
          bookingById.clientId.toString() === customerByIdResponse.data._id
        ) {
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
  }, [bookingById.clientId, customerById._id, params]);

  return (
    <>
      SingleBooking works!
      <p>CUSTOMERS NAME</p>
      <p>ID: {customerById._id}</p>
      <Link to={"/admin/customers/" + customerById._id}>
        <button>GO TO CUSTOMER</button>
      </Link>
      <p>DATE OF SITTING {bookingById.date.toLocaleString()}</p>
      <p>WHICH SITTING {bookingById.sittingTime}</p>
      <p>PEOPLE ON RESERVATION {bookingById.numberOfPeople}</p>
      {adminPath ? (
        <>
          <button>EDIT</button>
          {confirmDelete ? (
            <>
              <button onClick={() => deleteBooking(bookingById._id)}>
                <Link to={"/admin"}>Confirm</Link>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >
                Delete
              </button>
            </>
          )}
        </>
      ) : (
        <>
          {confirmDelete ? (
            <>
              <button onClick={() => deleteBooking(bookingById._id)}>
                <Link to={"/"}>Confirm</Link>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >
                Delete
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};
