import { useEffect, useState } from "react";
import { IBooking } from "../../models/IBooking";
import { ICustomer } from "../../models/ICustomer";
import { fetchBookings } from "../../services/handleBookingsFetch.service";
import { fetchCustomers } from "../../services/handleCustomersFetch.service";
import { AdminBookingDetail } from "./AdminBookingDetails";
import { Customer } from "../Customer";
import { Background } from "../StyledComponents/Background";
import { Input } from "../StyledComponents/Form";
import { colors } from "../StyledComponents/mixins";
import { StyledHr, StyledLink } from "../StyledComponents/TextElements";
import { FlexDiv } from "../StyledComponents/Wrappers";

export const AdminBookings = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const [searchValue, setSearchValue] = useState("");

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
        borderRadius='10px'
        background={colors.LightPink}
        width='80%'
        height='min-content'
        dir='column'
        padding='40px'
      >
        <Input
          type='text'
          placeholder='Search guest...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {customers
          .filter((item) => {
            if (!searchValue) return true;
            if (item.email.includes(searchValue.toLowerCase())) {
              return true;
            }
            return false;
          })
          .map((customer) => {
            return (
              <FlexDiv
                dir='column'
                tabletdir='row'
                justify='space between'
                key={customer._id}
              >
                <FlexDiv gap='10px' dir='column'>
                  <FlexDiv dir='column'>
                    <StyledLink
                      color='black'
                      to={"/admin/customers/" + customer._id}
                    >
                      <StyledHr></StyledHr>

                      <h4>{customer.name}</h4>
                    </StyledLink>

                    <AdminBookingDetail
                      bookings={bookings.filter(
                        (booking) =>
                          booking.clientId!.toString() === customer._id
                      )}
                    ></AdminBookingDetail>
                  </FlexDiv>
                </FlexDiv>
              </FlexDiv>
            );
          })}
      </FlexDiv>
    </Background>
  );
};
