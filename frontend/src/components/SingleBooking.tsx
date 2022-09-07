import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { bookingsDefaultValue, IBooking } from "../models/IBooking";
import { customersDefaultValue, ICustomer } from "../models/ICustomer";
import { fetchBookingByID } from "../services/handleBookingsFetch.service";
import { fetchCustomerByID } from "../services/handleCustomersFetch.service";
import { ISittings } from "../services/utils";
import { UpdateBooking } from "./admin/UpdateBooking";
import { BookingDeleteButton } from "./BookingDeleteButton";
import { SingleBookingRender } from "./SingleBookingRender";
import { Background } from "./StyledComponents/Background";
import { colors } from "./StyledComponents/mixins";
import { StyledButton } from "./StyledComponents/StyledButton";
import { FlexDiv } from "./StyledComponents/Wrappers";

export const SingleBooking = () => {
  const [bookingById, setBookingById] =
    useState<IBooking>(bookingsDefaultValue);

  const [customerById, setCustomerById] = useState<ICustomer>(
    customersDefaultValue
  );
  const [inEdit, setInEdit] = useState(false);

  let params = useParams();
  const location = useLocation();
  const adminPath = location.pathname === "/admin/" + bookingById._id;
  const guestPath = location.pathname === "/reservation/" + bookingById._id;

  useEffect(() => {
    fetchCustomerByID(customerById._id)
      .then(async (customerByIdResponse) => {
        setCustomerById(customerByIdResponse.data);

        const bookingsByIdResponse = await fetchBookingByID(params.id!);
        setBookingById(bookingsByIdResponse.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
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
                  <UpdateBooking></UpdateBooking>

                  <StyledButton
                    width='70px'
                    height='30px'
                    onClick={() => setInEdit(false)}
                  >
                    Back
                  </StyledButton>
                </>
              ) : (
                <>
                  <FlexDiv gap='10px'>
                    <StyledButton
                      width='70px'
                      height='30px'
                      onClick={() => setInEdit(true)}
                    >
                      Edit
                    </StyledButton>

                    <SingleBookingRender
                      bookingById={bookingById}
                    ></SingleBookingRender>

                    <BookingDeleteButton
                      adminPath={adminPath}
                      guestPath={guestPath}
                      bookingById={bookingById}
                    ></BookingDeleteButton>
                  </FlexDiv>
                </>
              )}
            </>
          ) : (
            <>
              {guestPath ? (
                <>
                  <SingleBookingRender
                    bookingById={bookingById}
                  ></SingleBookingRender>

                  <BookingDeleteButton
                    adminPath={adminPath}
                    guestPath={guestPath}
                    bookingById={bookingById}
                  ></BookingDeleteButton>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </FlexDiv>
      </Background>
    </>
  );
};
