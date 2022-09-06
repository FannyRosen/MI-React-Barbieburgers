import { IBooking } from "../models/IBooking";
import { StyledP } from "./StyledComponents/TextElements";

interface IRender {
  bookingById: IBooking;
}

export const SingleBookingRender = (props: IRender) => {
  return (
    <>
      <StyledP fontsize="18px" padding="20px">
        Date of sitting:
        {new Date(props.bookingById.date).toLocaleDateString()}
      </StyledP>
      <StyledP fontsize="18px" padding="20px">
        Which sitting: {props.bookingById.sittingTime}
      </StyledP>
      <StyledP fontsize="18px" padding="20px">
        Number of guests: {props.bookingById.numberOfPeople}
      </StyledP>
    </>
  );
};
