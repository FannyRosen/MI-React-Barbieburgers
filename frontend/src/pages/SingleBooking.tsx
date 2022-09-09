import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { bookingsDefaultValue, IBooking } from "../models/IBooking";
import { customersDefaultValue, ICustomer } from "../models/ICustomer";
import { fetchBookingByID } from "../services/handleBookingsFetch.service";
import { fetchCustomerByID } from "../services/handleCustomersFetch.service";
import { UpdateBooking } from "../components/admin/UpdateBooking";
import { BookingDeleteButton } from "../components/admin/BookingDeleteButton";
import { SingleBookingRender } from "../components/admin/SingleBookingRender";
import { Background } from "../components/StyledComponents/Background";
import { colors } from "../components/StyledComponents/mixins";
import { StyledButton } from "../components/StyledComponents/StyledButton";
import { FlexDiv } from "../components/StyledComponents/Wrappers";
import { Loader } from "../components/Loader";

export const SingleBooking = () => {
  const [booking, setBooking] = useState<IBooking>(bookingsDefaultValue);
  const [customer, setCustomer] = useState<ICustomer>(customersDefaultValue);
  const [inEdit, setInEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();
  const location = useLocation();
  const adminPath = location.pathname === "/admin/" + params.id;
  const guestPath = location.pathname === "/reservation/" + params.id;

  useEffect(() => {
    const getBooking = async () => {
      const bookingResponse = await fetchBookingByID(params.id!);
      setBooking(bookingResponse.data);
      setIsLoading(false);
    };
    getBooking();
  }, [inEdit]);

  useEffect(() => {
    if (booking._id !== "") {
      fetchCustomerByID(booking.clientId!.toString()).then(
        async (customerByIdResponse) => {
          setCustomer(customerByIdResponse.data);
          setIsLoading(false);
        }
      );
    }
  }, [booking]);

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
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {adminPath ? (
              <>
                {inEdit ? (
                  <>
                    <UpdateBooking onClick={() => setInEdit(false)} />

                    <StyledButton
                      width="70px"
                      height="30px"
                      onClick={() => setInEdit(false)}
                    >
                      Back
                    </StyledButton>
                  </>
                ) : (
                  <FlexDiv gap="10px">
                    <StyledButton
                      className="editbutton"
                      width="70px"
                      height="30px"
                      onClick={() => setInEdit(true)}
                    >
                      Edit
                    </StyledButton>

                    <SingleBookingRender
                      booking={booking}
                      customer={customer}
                    ></SingleBookingRender>

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
                    <SingleBookingRender
                      booking={booking}
                      customer={customer}
                    ></SingleBookingRender>

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
          </>
        )}
      </FlexDiv>
    </Background>
  );
};
