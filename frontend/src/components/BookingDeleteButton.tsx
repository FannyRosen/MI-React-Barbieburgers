import { useState } from "react";
import { Link } from "react-router-dom";
import { IBooking } from "../models/IBooking";
import { deleteBooking } from "../services/handleBookingsFetch.service";
import { StyledButton } from "./StyledComponents/StyledButton";
interface ITest {
  bookingById: IBooking;
  guestPath: boolean;
  adminPath: boolean;
}

export const BookingDeleteButton = (props: ITest) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      {confirmDelete ? (
        <>
          <StyledButton
            width="70px"
            height="30px"
            onClick={() => deleteBooking(props.bookingById._id!)}
          >
            {props.guestPath ? <Link to={"/"}>Confirm</Link> : <></>}
            {props.adminPath ? <Link to={"/admin"}>Confirm</Link> : <></>}
          </StyledButton>
        </>
      ) : (
        <>
          <StyledButton
            width="70px"
            height="30px"
            // onClick={() => deleteBooking(props.bookingById._id!)}
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </StyledButton>
        </>
      )}
    </>
  );
};
