import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { bookingsDefaultValue, IBooking } from "../models/IBooking";
import { customersDefaultValue, ICustomer } from "../models/ICustomer";
import {
  deleteBooking,
  editBooking,
  fetchBookingByID,
} from "../services/handleBookingsFetch.service";
import { fetchCustomerByID } from "../services/handleCustomersFetch.service";
import { Form } from "./StyledComponents/Form";
import { StyledLabel } from "./StyledComponents/TextElements";
import { FlexDiv } from "./StyledComponents/Wrappers";

export const SingleBooking = () => {
  const [bookingById, setBookingById] =
    useState<IBooking>(bookingsDefaultValue);
  const [customerById, setCustomerById] = useState<ICustomer>(
    customersDefaultValue
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [inEdit, setInEdit] = useState(false);
  const [editNOP, setEditNOP] = useState<number>(0);
  const [editDate, setEditDate] = useState<Date>(new Date("1999-01-01"));
  const [editTime, setEditTime] = useState<number>(0);

  let params = useParams();

  useEffect(() => {
    fetchCustomerByID(customerById._id)
      .then(async (customerByIdResponse) => {
        setCustomerById(customerByIdResponse.data);

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
  }, [params]); // håll kanske tom []

  useEffect(() => {
    setEditDate(new Date(bookingById.date));
    setEditNOP(bookingById.numberOfPeople);
    //setEditTime(bookingById.sittingTime)
  }, [bookingById]);

  const curr = new Date();
  curr.setDate(curr.getDate());
  const inputDate = curr.toISOString().substring(0, 10);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDate(new Date(e.target.value));
  };

  /*   const handleEditNOP = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditNOP(parseInt(e.currentTarget.value));
  }; */

  const handleEditNOP = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditNOP(parseInt(e.target.value));
  };

  return (
    <>
      SingleBooking works!
      <p>CUSTOMERS NAME</p>
      <p>ID: {customerById._id}</p>
      <Link to={"/admin/customers/" + customerById._id}>
        <button>GO TO CUSTOMER</button>
      </Link>
      {inEdit ? (
        <>
          <Form>
            <FlexDiv dir="column" gap="10px">
              <StyledLabel>Edit date</StyledLabel>
              <input
                type="date"
                min={inputDate}
                max={"2023-12-31"}
                defaultValue={editDate.toLocaleDateString()}
                onChange={handleEditChange}
              />
              <StyledLabel>Edit sitting time</StyledLabel>

              <select name="time" defaultValue={} onChange={}>
                <option value="1">6.00 pm</option>
                <option value="2">9.00 pm</option>
              </select>
              <StyledLabel>Edit number of people</StyledLabel>
              <input
                type="number"
                defaultValue={editNOP}
                onChange={handleEditNOP}
                min="1"
                max="12"
              />
              {/* <button onClick={() => setEditBooking()}>Save</button> */}
            </FlexDiv>
          </Form>
        </>
      ) : (
        <>
          {" "}
          <p>
            DATE OF SITTING {new Date(bookingById.date).toLocaleDateString()}
          </p>
          <p>WHICH SITTING {bookingById.sittingTime}</p>
          <p>PEOPLE ON RESERVATION {bookingById.numberOfPeople}</p>
        </>
      )}
      <button onClick={() => setInEdit(true)}>Edit</button>
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
  );
};
function setDate(arg0: Date) {
  throw new Error("Function not implemented.");
}
