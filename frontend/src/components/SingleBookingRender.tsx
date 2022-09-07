import { IBooking } from "../models/IBooking";
import { StyledP } from "./StyledComponents/TextElements";

interface IRender {
  booking: IBooking;
}

export const SingleBookingRender = (props: IRender) => {
  return (
    <>
      <StyledP fontsize='18px' padding='20px'>
        Date of sitting:
        {new Date(props.booking.date).toLocaleDateString()}
      </StyledP>
      <StyledP fontsize='18px' padding='20px'>
        Which sitting: {props.booking.sittingTime == 1 ? "6.00pm" : "9.00pm"}
      </StyledP>
      <StyledP fontsize='18px' padding='20px'>
        Number of guests: {props.booking.numberOfPeople}
      </StyledP>
    </>
  );
};
