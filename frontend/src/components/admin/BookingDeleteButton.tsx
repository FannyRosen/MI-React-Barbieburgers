import { useState } from "react";
import { Link } from "react-router-dom";
import { IBooking } from "../../models/IBooking";
import { deleteBooking } from "../../services/handleBookingsFetch.service";
import { StyledButton } from "../StyledComponents/StyledButton";
interface IDeleteButtons {
  booking: IBooking;
  guestPath: boolean;
  adminPath: boolean;
}

export const BookingDeleteButton = (props: IDeleteButtons) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      {confirmDelete ? (
        <>
          <StyledButton
            width='70px'
            height='30px'
            onClick={() => deleteBooking(props.booking._id!)}
          >
            {props.guestPath ? <Link to={"/"}>Confirm</Link> : <></>}
            {props.adminPath ? <Link to={"/admin"}>Confirm</Link> : <></>}
          </StyledButton>
        </>
      ) : (
        <>
          <StyledButton
            width='70px'
            height='30px'
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </StyledButton>
        </>
      )}
    </>
  );
};
