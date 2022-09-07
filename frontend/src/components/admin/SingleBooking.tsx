import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { bookingsDefaultValue, IBooking } from "../../models/IBooking";
import { customersDefaultValue, ICustomer } from "../../models/ICustomer";
import { fetchBookingByID } from "../../services/handleBookingsFetch.service";
import { fetchCustomerByID } from "../../services/handleCustomersFetch.service";
import { UpdateBooking } from "./UpdateBooking";
import { BookingDeleteButton } from "../BookingDeleteButton";
import { SingleBookingRender } from "../SingleBookingRender";
import { Background } from "../StyledComponents/Background";
import { colors } from "../StyledComponents/mixins";
import { StyledButton } from "../StyledComponents/StyledButton";
import { FlexDiv } from "../StyledComponents/Wrappers";

export const SingleBooking = () => {
  const [booking, setBooking] = useState<IBooking>(bookingsDefaultValue);

  const [customer, setCustomer] = useState<ICustomer>(customersDefaultValue);
  const [inEdit, setInEdit] = useState(false);

  let params = useParams();
  const location = useLocation();
  const adminPath = location.pathname === "/admin/" + booking._id;
  const guestPath = location.pathname === "/reservation/" + booking._id;

  useEffect(() => {
    fetchCustomerByID(customer._id)
      .then(async (customerByIdResponse) => {
        setCustomer(customerByIdResponse.data);
        const bookingResponse = await fetchBookingByID(params.id!);
        setBooking(bookingResponse.data);
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
        {adminPath ? (
          <>
            {inEdit ? (
              <>
                <UpdateBooking onClick={() => setInEdit(false)} />

                <StyledButton
                  width='70px'
                  height='30px'
                  onClick={() => setInEdit(false)}
                >
                  Back
                </StyledButton>
              </>
            ) : (
              <FlexDiv gap='10px'>
                <StyledButton
                  width='70px'
                  height='30px'
                  onClick={() => setInEdit(true)}
                >
                  Edit
                </StyledButton>

                <SingleBookingRender booking={booking}></SingleBookingRender>

                <BookingDeleteButton
                  adminPath={adminPath}
                  guestPath={guestPath}
                  booking={booking}
                ></BookingDeleteButton>
              </FlexDiv>
            )}
          </>
        ) : (
          <>
            {guestPath ? (
              <>
                <SingleBookingRender booking={booking}></SingleBookingRender>

                <BookingDeleteButton
                  adminPath={adminPath}
                  guestPath={guestPath}
                  booking={booking}
                ></BookingDeleteButton>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </FlexDiv>
    </Background>
  );
};
