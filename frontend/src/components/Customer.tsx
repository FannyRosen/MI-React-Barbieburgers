import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  deleteCustomer,
  editCustomer,
  fetchCustomerByID,
} from "../services/handleCustomersFetch.service";
import { customersDefaultValue, ICustomer } from "./../models/ICustomer";

export const Customer = () => {
  const [customerById, setCustomerById] = useState<ICustomer>(
    customersDefaultValue
  );

  let params = useParams();

  useEffect(() => {
    fetchCustomerByID(params.id!).then((response) => {
      setCustomerById(response.data);
      console.log(response);
    });
  }, [params]);

  return (
    <>
      Customer works!
      <p>{customerById.name}</p>
      <p>{customerById.email}</p>
      <p>{customerById.phone}</p>
      <button
        onClick={() => {
          deleteCustomer(customerById._id);
        }}
      >
        <Link to={"/admin"}>DELETE</Link>
      </button>
    </>
  );
};
