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

  const [updateBooking, setUpdateBooking] = useState<IBooking>({
    numberOfPeople: bookingById.numberOfPeople,
    date: bookingById.date,
    sittingTime: bookingById.sittingTime,
  });
  const [date, setDate] = useState<Date>(new Date());
  const [numberOfPeople, setNOP] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();

  const curr = new Date();
  curr.setDate(curr.getDate());
  const inputDate = curr.toISOString().substring(0, 10);

  useEffect(() => {
    const getBooking = async () => {
      await fetchBookingByID(params.id!).then((booking) => {
        console.log(booking.data);
        setBookingById(booking.data); // ÖÄNDRA
        setIsLoading(false);
      });
    };
    getBooking();
  }, []);

  const submitUpdatedBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editBooking(params.id!, updateBooking);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value));
  };

  const handleNOPChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNOP(parseInt(e.currentTarget.value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo((customerInfo) => ({
      ...customerInfo,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <Form
          onSubmit={() => {
            if (numberOfPeople != 0) {
              checkDate();
            } else {
              console.log("error");
            }
          }}
        >
          <FlexDiv dir="column" gap="10px">
            <StyledLabel>Choose a date</StyledLabel>
            <MyCalendar></MyCalendar>
            <input
              required
              onChange={handleDateChange}
              id="date"
              type="date"
              name="date"
              defaultValue={""}
              min={inputDate}
              max={"2023-12-31"}
            />

            <Label>Number of people</Label>
            <StyledSelect
              required
              id="date"
              name="date"
              onChange={handleNOPChange}
              defaultValue="0"
            >
              <option disabled value="0">
                0
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </StyledSelect>
            <p>
              Maximum per table: 6 <br />
              If you are more than 6 people you will be divided between tables
            </p>
            <Input type="submit" value={"Check availability"} />
          </FlexDiv>
        </Form>
      )}
    </>
  );
};
