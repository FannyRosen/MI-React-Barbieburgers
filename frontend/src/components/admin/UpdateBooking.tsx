import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookingsDefaultValue, IBooking } from "../../models/IBooking";
import {
  editBooking,
  fetchBookingByID,
} from "../../services/handleBookingsFetch.service";
import { checkAvailableSittings } from "../../services/utils";
import { MyCalendar } from "../partials/Calendar";
import { Form, Input, Label } from "../StyledComponents/Form";
import { StyledLabel, StyledSelect } from "../StyledComponents/TextElements";
import { FlexDiv } from "../StyledComponents/Wrappers";

interface IProps {
  onClick(): void;
}

export const UpdateBooking = (props: IProps) => {
  const [existingBooking, setExistingBooking] =
    useState<IBooking>(bookingsDefaultValue);
  const [date, setDate] = useState(new Date());
  const [numberOfPeople, setNOP] = useState<number>(1);
  const [sittingTime, setSittingTime] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();

  useEffect(() => {
    setDate(existingBooking.date);
    setNOP(existingBooking.numberOfPeople);
    setSittingTime(existingBooking.sittingTime);
  }, [existingBooking]);

  useEffect(() => {
    const getBooking = async () => {
      await fetchBookingByID(params.id!).then((booking) => {
        setExistingBooking(booking.data);
        setIsLoading(false);
      });
    };
    getBooking();
  }, []);

  const submitUpdatedBooking = async (e: FormEvent) => {
    e.preventDefault();
    let updateBooking = {
      date: new Date(date),
      numberOfPeople,
      sittingTime,
    };
    await checkAvailableSittings(
      updateBooking.date,
      updateBooking.numberOfPeople
    );
    editBooking(params.id!, updateBooking).then(() => {
      props.onClick();
    });
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
            <MyCalendar
              handleDate={handleDateChange}
              defaultDate={existingBooking.date}
            />
            <Label>Number of people</Label>
            <StyledSelect
              required
              name='numberOfPeople'
              onChange={handleNOPChange}
              defaultValue={existingBooking.numberOfPeople}
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
              name='sittingTime'
              onChange={handleSittingTimeChange}
              defaultValue={existingBooking.sittingTime}
            >
              <option value={1}>6.00 pm</option>
              <option value={2}>9.00 pm</option>
            </StyledSelect>
            <Input type='submit' value={"update"} />
          </FlexDiv>
        </Form>
      )}
    </>
  );
};
