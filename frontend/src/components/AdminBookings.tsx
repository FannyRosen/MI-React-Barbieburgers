import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBooking } from "../models/IBooking";
import { ICustomer } from "../models/ICustomer";
import { fetchBookings } from "../services/handleBookingsFetch.service";
import { fetchCustomers } from "../services/handleCustomersFetch.service";

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
    <>
      Admin Bookings works!
      <div>
        {customers.map((customer) => {
          return (
            <>
              <div key={customer._id}>
                <p>{customer.name}</p>
                <p>{customer.email}</p>
                <Link to={"/admin/customers/" + customer._id}>
                  <button> GO TO CUSTOMER</button>
                </Link>

                {bookings.map((booking) => {
                  if (booking.clientId.toString() === customer._id) {
                    return (
                      <>
                        <div key={booking._id}>
                          <div>{booking.date.toLocaleString()}</div>
                          <div>{booking.sittingTime}</div>
                          <div>{booking.numberOfPeople}</div>
                          <Link to={"/admin/" + booking._id}>
                            <button>GO TO BOOKING</button>
                          </Link>
                        </div>
                      </>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
