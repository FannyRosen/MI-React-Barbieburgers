import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCustomerByID } from "../services/handleCustomersFetch.service";
import {
  customersDefaultValue,
  ICustomer,
  ICustomerResponse,
} from "./../models/ICustomer";

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
  }, []);

  return (
    <>
      Customer works!
      <p>{customerById.email}</p>
    </>
  );
};
