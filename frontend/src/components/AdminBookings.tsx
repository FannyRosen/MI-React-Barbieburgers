import { useEffect, useState } from "react";
import {
  bookingsDefaultValue,
  IBooking,
  IBookingResponse,
} from "../models/IBooking";
import { fetchBookings } from "../services/handleBookingsFetch.service";

export const AdminBookings = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  useEffect(() => {
    fetchBookings()
      .then((response) => {
        setBookings(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      Admin Bookings works!
      <div>
        {bookings.map((allBookings, i) => {
          return (
            <>
              <div key={i}>
                <p>{allBookings.date}</p>
                <p>{allBookings.sittingTime}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
