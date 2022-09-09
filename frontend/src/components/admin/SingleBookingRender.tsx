import { IBooking } from "../../models/IBooking";
import { ICustomer } from "../../models/ICustomer";
import { StyledButton } from "../StyledComponents/StyledButton";
import { StyledLink, StyledP } from "../StyledComponents/TextElements";
import { FlexDiv } from "../StyledComponents/Wrappers";

interface IRender {
  booking: IBooking;
  customer: ICustomer;
}

export const SingleBookingRender = (props: IRender) => {
  return (
    <>
      <FlexDiv dir='column'>
        <FlexDiv dir='column' gap='10px'>
          <StyledLink to='/admin'>
            <StyledButton>Back to all bookings</StyledButton>
          </StyledLink>
          <StyledP fontsize='18px'>Customer: {props.customer.name}</StyledP>
          <StyledP fontsize='18px'>Email: {props.customer.email}</StyledP>
          <StyledP fontsize='18px'>Phone: {props.customer.phone}</StyledP>
        </FlexDiv>
        <FlexDiv>
          <StyledP fontsize='18px' padding='20px'>
            Date of sitting:
            {new Date(props.booking.date).toLocaleDateString()}
          </StyledP>
          <StyledP fontsize='18px' padding='20px'>
            Which sitting:{" "}
            {props.booking.sittingTime === 1 ? "6.00pm" : "9.00pm"}
          </StyledP>
          <StyledP fontsize='18px' padding='20px'>
            Number of guests: {props.booking.numberOfPeople}
          </StyledP>
        </FlexDiv>
      </FlexDiv>
    </>
  );
};
