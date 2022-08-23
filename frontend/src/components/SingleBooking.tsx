import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookingsDefaultValue, IBooking } from "../models/IBooking";
import { customersDefaultValue, ICustomer } from "../models/ICustomer";
import { fetchBookingByID } from "../services/handleBookingsFetch.service";
import { fetchCustomerByID } from "../services/handleCustomersFetch.service";

export const SingleBooking = () => {
  const [bookingById, setBookingById] =
    useState<IBooking>(bookingsDefaultValue);
  const [customers, setCustomers] = useState<ICustomer>(customersDefaultValue);

  let params = useParams();

  return <>SingleBooking works!</>;
};
