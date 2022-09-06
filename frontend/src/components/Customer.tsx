import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteCustomer,
  fetchCustomerByID,
} from "../services/handleCustomersFetch.service";
import { customersDefaultValue, ICustomer } from "./../models/ICustomer";
import { Background } from "./StyledComponents/Background";
import { colors } from "./StyledComponents/mixins";
import { StyledButton } from "./StyledComponents/StyledButton";
import { StyledLink, StyledP } from "./StyledComponents/TextElements";
import { FlexDiv } from "./StyledComponents/Wrappers";

export const Customer = () => {
  const [customerById, setCustomerById] = useState<ICustomer>(
    customersDefaultValue
  );

  let params = useParams();

  useEffect(() => {
    fetchCustomerByID(params.id!).then((response) => {
      setCustomerById(response.data);
      // Fetch i fetch = hitta bokningar med clientID === customerId
      console.log(response);
    });
  }, [params]);

  return (
    <>
      <Background>
        <FlexDiv
          borderRadius="10px"
          background={colors.LightPink}
          width="80%"
          height="min-content"
          dir="column"
          padding="40px"
        >
          <StyledP fontsize="18px" padding="20px">
            {customerById.name}
          </StyledP>
          <StyledP fontsize="18px" padding="20px">
            {customerById.email}
          </StyledP>
          <StyledP fontsize="18px" padding="20px">
            {customerById.phone}
          </StyledP>
          <StyledButton
            onClick={() => {
              deleteCustomer(customerById._id);
            }}
          >
            <StyledLink to={"/admin"}>DELETE</StyledLink>
          </StyledButton>
        </FlexDiv>
      </Background>
    </>
  );
};
