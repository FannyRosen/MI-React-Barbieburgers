import { useState } from "react";
import { IBooking } from "../../models/IBooking";
import { StyledButton } from "../StyledComponents/StyledButton";
import { StyledLink, StyledP } from "../StyledComponents/TextElements";
import { FlexDiv } from "../StyledComponents/Wrappers";

interface IBookingDetail {
  bookings: IBooking[];
}

export const AdminBookingDetail = (props: IBookingDetail) => {
  const [openBookings, setOpenBookings] = useState(false);

  return (
    <>
      <FlexDiv dir='column'>
        <StyledButton
          onClick={() => setOpenBookings(!openBookings)}
          height='35px'
          width='80px'
        >
          {openBookings ? <>CLOSE</> : <>VIEW BOOKINGS</>}
        </StyledButton>
        {props.bookings.length > 0 ? (
          <>
            <p>{props.bookings.length} reservations</p>
          </>
        ) : (
          <>
            <p>Currently no reservations</p>
          </>
        )}

        {openBookings ? (
          <>
            <FlexDiv dir='column'>
              {props.bookings.map((booking) => {
                let date = new Date(booking.date);

                return (
                  <div key={booking._id}>
                    <FlexDiv gap='10px' dir='column' tabletdir='row'>
                      <StyledLink color='black' to={"/admin/" + booking._id}>
                        <StyledP weight='bolder' fontsize='16px'>
                          Date: {date.toLocaleDateString()}
                        </StyledP>
                      </StyledLink>
                      <p>Sitting: {booking.sittingTime}</p>
                      <p>Guests: {booking.numberOfPeople}</p>
                    </FlexDiv>
                  </div>
                );
              })}
            </FlexDiv>
          </>
        ) : (
          <></>
        )}
      </FlexDiv>
    </>
  );
};
