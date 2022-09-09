import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteCustomer,
  fetchCustomerByID,
} from "../services/handleCustomersFetch.service";
import { customersDefaultValue, ICustomer } from "../models/ICustomer";
import { Loader } from "../components/partials/Loader";
import { Background } from "../components/StyledComponents/Background";
import { colors } from "../components/StyledComponents/mixins";
import { StyledButton } from "../components/StyledComponents/StyledButton";
import {
  StyledLink,
  StyledP,
} from "../components/StyledComponents/TextElements";
import { FlexDiv } from "../components/StyledComponents/Wrappers";

export const Customer = () => {
  const [customerById, setCustomerById] = useState<ICustomer>(
    customersDefaultValue
  );
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();

  //Hämtar customer
  useEffect(() => {
    fetchCustomerByID(params.id!).then((response) => {
      setCustomerById(response.data);
      setIsLoading(false);
    });
  }, [params]);

  return (
    <>
      <Background>
        <FlexDiv
          borderRadius='10px'
          background={colors.LightPink}
          width='80%'
          height='min-content'
          dir='column'
          padding='40px'
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <StyledButton width='100px'>
                <StyledLink to={"/admin"}>GO BACK</StyledLink>
              </StyledButton>
              <StyledP fontsize='18px' padding='20px'>
                {customerById.name}
              </StyledP>
              <StyledP fontsize='18px' padding='20px'>
                {customerById.email}
              </StyledP>
              <StyledP fontsize='18px' padding='20px'>
                {customerById.phone}
              </StyledP>
              <StyledButton
                onClick={() => {
                  deleteCustomer(customerById._id);
                }}
              >
                <StyledLink to={"/admin"}>DELETE</StyledLink>
              </StyledButton>
            </>
          )}
        </FlexDiv>
      </Background>
    </>
  );
};
