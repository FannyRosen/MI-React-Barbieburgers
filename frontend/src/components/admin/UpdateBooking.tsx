import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookingsDefaultValue, IBooking } from "../../models/IBooking";

import {
  editBooking,
  fetchBookingByID,
} from "../../services/handleBookingsFetch.service";
import { MyCalendar } from "../partials/Calendar";
import { Form, Input, Label } from "../StyledComponents/Form";
import { StyledLabel, StyledSelect } from "../StyledComponents/TextElements";
import { FlexDiv } from "../StyledComponents/Wrappers";

export const UpdateBooking = () => {
  const [bookingById, setBookingById] =
    useState<IBooking>(bookingsDefaultValue);
  const [date, setDate] = useState(bookingById.date);
  const [numberOfPeople, setNOP] = useState<number>(bookingById.numberOfPeople);
  const [sittingTime, setSittingTime] = useState<number>(
    bookingById.sittingTime
  );
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();

  useEffect(() => {
    const getBooking = async () => {
      await fetchBookingByID(params.id!).then((booking) => {
        setBookingById(booking.data); // ÖÄNDRA
        setIsLoading(false);
      });
    };
    getBooking();
  }, []);

  const submitUpdatedBooking = (e: FormEvent) => {
    e.preventDefault();
    let updateBooking = {
      date: new Date(date),
      numberOfPeople,
      sittingTime,
    };
    console.log(updateBooking);

    editBooking(params.id!, updateBooking);
  };

  const handleDateChange = async (e: Date) => {
    setDate(e);
  };

  const handleNOPChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNOP(parseInt(e.currentTarget.value));
  };
  const handleSittingTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSittingTime(parseInt(e.currentTarget.value));
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <Form onSubmit={submitUpdatedBooking}>
          <FlexDiv dir='column' gap='10px'>
            <StyledLabel>Choose a date</StyledLabel>
            <MyCalendar handleDate={handleDateChange} />
            <Label>Number of people</Label>
            <StyledSelect
              required
              name='numberOfPeople'
              onChange={handleNOPChange}
              defaultValue={bookingById.numberOfPeople}
            >
              <option disabled value='0'>
                0
              </option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
              <option value='11'>11</option>
              <option value='12'>12</option>
            </StyledSelect>
            <StyledSelect
              required
              id='date'
              name='date'
              onChange={handleSittingTimeChange}
              defaultValue={bookingById.sittingTime}
            >
              <option value='1'>6.00 pm</option>
              <option value='2'>9.00 pm</option>
            </StyledSelect>
            <Input type='submit' value={"update"} />
          </FlexDiv>
        </Form>
      )}
    </>
  );
};
