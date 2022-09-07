import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, matchRoutes, useLocation, useParams } from "react-router-dom";
import { bookingsDefaultValue, IBooking } from "../models/IBooking";
import { customersDefaultValue, ICustomer } from "../models/ICustomer";
import {
  deleteBooking,
  editBooking,
  fetchBookingByID,
} from "../services/handleBookingsFetch.service";
import { fetchCustomerByID } from "../services/handleCustomersFetch.service";
import { checkAvailableSittings, ISittings } from "../services/utils";
import { UpdateBooking } from "./admin/UpdateBooking";
import { BookingDeleteButton } from "./BookingDeleteButton";
import { SingleBookingRender } from "./SingleBookingRender";
import { Background } from "./StyledComponents/Background";
import { Form } from "./StyledComponents/Form";
import { colors } from "./StyledComponents/mixins";
import { StyledButton } from "./StyledComponents/StyledButton";
import { StyledLabel, StyledP } from "./StyledComponents/TextElements";
import { FlexDiv } from "./StyledComponents/Wrappers";

export const SingleBooking = () => {
  const [bookingById, setBookingById] =
    useState<IBooking>(bookingsDefaultValue);

  const [customerById, setCustomerById] = useState<ICustomer>(
    customersDefaultValue
  );
  const [inEdit, setInEdit] = useState(false);

  const [editNOP, setEditNOP] = useState<number>(0);
  const [editDate, setEditDate] = useState<Date>(new Date("1999-01-01"));
  const [editSittingTime, setEditSittingTime] = useState<number>(0);
  const [isAvailable, setIsAvailable] = useState<ISittings>();
  const [confirmEdit, setConfirmEdit] = useState<IBooking>(bookingById);

  let params = useParams();
  const location = useLocation();
  const adminPath = location.pathname === "/admin/" + bookingById._id;
  const guestPath = location.pathname === "/reservation/" + bookingById._id;

  useEffect(() => {
    fetchCustomerByID(customerById._id)
      .then(async (customerByIdResponse) => {
        setCustomerById(customerByIdResponse.data);

        if (
          /* customerByIdResponse.data._id === bookingById.clientId.toString() */
          bookingById.clientId!.toString() === customerByIdResponse.data._id
        ) {
          console.log("stämmer");
        } else {
          console.log("fel");
        }

        const bookingsByIdResponse = await fetchBookingByID(params.id!);
        setBookingById(bookingsByIdResponse.data);
        console.log(bookingsByIdResponse);

        /*  const postUpdatedBooking = editBooking(params.id!);
        setConfirmEdit(bookingById);
        console.log(postUpdatedBooking); */
      })

      .catch((error) => {
        console.log(error);
      });
  }, [bookingById.clientId, customerById._id, params]);

  /* 
  useEffect(() => {
    setEditDate(new Date(bookingById.date));
    setEditNOP(bookingById.numberOfPeople);
    setEditSittingTime(bookingById.sittingTime);
  }, [bookingById]);

  useEffect(() => {
    const checkDate = async () => {
      const isAvailableinDB = await checkAvailableSittings(editDate);
      setIsAvailable(isAvailableinDB);
    };
    checkDate().catch(console.error);
    console.log(isAvailable);
  }, [editDate]);

  const curr = new Date();
  curr.setDate(curr.getDate());
  const inputDate = curr.toISOString().substring(0, 10);
  
  const updateBooking = (e: ChangeEvent<HTMLFormElement>) => {
    editBooking(e.target.value)
  };

  
  const handleEditChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDate(new Date(e.target.value));
    const isAvailableinDB = await checkAvailableSittings(editDate);
    setIsAvailable(isAvailableinDB);
  };

  const handleEditNOP = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditNOP(parseInt(e.target.value));
  };

  const handleEditSittingTime = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEditSittingTime(parseInt(e.target.value));
  };

 */

  return (
    <>
      <Background>
        <FlexDiv
          borderRadius="10px"
          background={colors.LightPink}
          width="80%"
          height="min-content"
          dir="column"
          padding="40px"
        >
          {adminPath ? (
            <>
              {inEdit ? (
                <>
                  {/* <Form>
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

                      <select
                        name="time"
                        defaultValue={editSittingTime.toString()}
                        onChange={handleEditSittingTime}
                      >
                        {isAvailable?.firstSitting ? (
                          <option value="1">6.00 pm</option>
                        ) : (
                          <option>not available</option>
                        )}
                        {isAvailable?.secondSitting ? (
                          <option value="1">9.00 pm</option>
                        ) : (
                          <option>not available</option>
                        )}
                      </select>

                      <StyledLabel>Edit number of people</StyledLabel>
                      <input
                        type="number"
                        defaultValue={editNOP}
                        onChange={handleEditNOP}
                        min="1"
                        max="12"
                      />
                      <button onSubmit={() => editBooking(bookingById._id)}>
                        Save
                      </button>
                    </FlexDiv>
                  </Form>  */}

                  {/* UPDATE FORM */}

                  <UpdateBooking></UpdateBooking>

                  {/* !UPDATE FORM */}

                  <StyledButton
                    width="70px"
                    height="30px"
                    onClick={() => setInEdit(false)}
                  >
                    Back
                  </StyledButton>
                </>
              ) : (
                <>
                  <FlexDiv gap="10px">
                    <StyledButton
                      width="70px"
                      height="30px"
                      onClick={() => setInEdit(true)}
                    >
                      Edit
                    </StyledButton>

                    <SingleBookingRender
                      bookingById={bookingById}
                    ></SingleBookingRender>

                    <BookingDeleteButton
                      adminPath={adminPath}
                      guestPath={guestPath}
                      bookingById={bookingById}
                    ></BookingDeleteButton>
                  </FlexDiv>
                </>
              )}
            </>
          ) : (
            <>
              {guestPath ? (
                <>
                  <SingleBookingRender
                    bookingById={bookingById}
                  ></SingleBookingRender>

                  <BookingDeleteButton
                    adminPath={adminPath}
                    guestPath={guestPath}
                    bookingById={bookingById}
                  ></BookingDeleteButton>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </FlexDiv>
      </Background>
    </>
  );
};
