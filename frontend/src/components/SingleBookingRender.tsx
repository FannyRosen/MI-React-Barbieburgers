import { IBooking } from "../models/IBooking";

interface IRender {
  bookingById: IBooking;
}

export const SingleBookingRender = (props: IRender) => {
  return (
    <>
      <p>
        DATE OF SITTING:
        {new Date(props.bookingById.date).toLocaleDateString()}
      </p>
      <p>WHICH SITTING: {props.bookingById.sittingTime}</p>
      <p>PEOPLE ON RESERVATION: {props.bookingById.numberOfPeople}</p>
    </>
  );
};
