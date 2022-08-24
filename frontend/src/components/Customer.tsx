import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCustomerByID } from "../services/handleCustomersFetch.service";
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
      <button>EDIT</button>
      <button>DELETE</button>
    </>
  );
};
