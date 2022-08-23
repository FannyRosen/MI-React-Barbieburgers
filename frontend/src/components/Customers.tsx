import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ICustomer } from "../models/ICustomer";
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
        {customers.map((customers, _id) => {
          return (
            <>
              <div key={_id}>
                <p>{customers.name}</p>
                <p>{customers.email}</p>
                <p>{customers.phone}</p>
                <Link to={"/admin/customers/" + customers._id}>
                  <button>GO TO CUSTOMER</button>
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
