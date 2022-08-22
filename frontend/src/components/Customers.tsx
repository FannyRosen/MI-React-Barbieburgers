import { useState, useEffect } from "react";
import { ICustomer, ICustomerResponse } from "../models/ICustomer";
import { fetchCustomers } from "../services/handleCustomersFetch.service";

export const Customers = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    fetchCustomers()
      .then((response) => {
        setCustomers(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      Customers works!
      <div>
        {customers.map((allCustomers, i) => {
          return (
            <>
              <div key={i}>
                <p>{allCustomers.name}</p>
                <p>{allCustomers.email}</p>
                <p>{allCustomers.phone}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
