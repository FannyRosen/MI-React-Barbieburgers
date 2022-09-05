import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBooking } from "../models/IBooking";
import { ICustomer } from "../models/ICustomer";
import { fetchBookings } from "../services/handleBookingsFetch.service";
import { fetchCustomers } from "../services/handleCustomersFetch.service";
import { Background } from "./StyledComponents/Background";
import { colors } from "./StyledComponents/mixins";
import { StyledHr, StyledLink, StyledP } from "./StyledComponents/TextElements";
import { FlexDiv } from "./StyledComponents/Wrappers";

export const AdminBookings = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    fetchCustomers()
      .then(async (customerResponse) => {
        setCustomers(customerResponse.data);

        const bookingResponse = await fetchBookings();
        setBookings(bookingResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Background>
      <FlexDiv
        borderRadius="10px"
        background={colors.LightPink}
        width="80%"
        height="min-content"
        dir="column"
        padding="40px"
      >
        {customers.map((customer) => {
          return (
            <FlexDiv
              dir="column"
              tabletdir="row"
              justify="space between"
              key={customer._id}
            >
              <FlexDiv gap="10px" dir="column">
                <StyledLink
                  color="black"
                  to={"/admin/customers/" + customer._id}
                >
                  <StyledHr></StyledHr>
                  <h4>{customer.name}</h4>
                </StyledLink>

                {bookings.map((booking) => {
                  let date = new Date(booking.date);

                  if (booking.clientId.toString() === customer._id) {
                    return (
                      <div key={booking._id}>
                        <FlexDiv gap="10px" dir="column" tabletdir="row">
                          <StyledLink
                            color="black"
                            to={"/admin/" + booking._id}
                          >
                            <StyledP weight="bolder" fontsize="16px">
                              Date: {date.toLocaleDateString()}
                            </StyledP>
                          </StyledLink>
                          <p>Sitting: {booking.sittingTime}</p>
                          <p>Guests: {booking.numberOfPeople}</p>
                        </FlexDiv>
                      </div>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </FlexDiv>
            </FlexDiv>
          );
        })}
      </FlexDiv>
    </Background>
  );
};
