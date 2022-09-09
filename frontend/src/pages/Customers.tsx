import { useState, useEffect } from "react";
import { ICustomer } from "../models/ICustomer";
import { fetchCustomers } from "../services/handleCustomersFetch.service";
import { Background } from "../components/StyledComponents/Background";
import { colors } from "../components/StyledComponents/mixins";
import { StyledButton } from "../components/StyledComponents/StyledButton";
import {
  StyledLink,
  StyledP,
} from "../components/StyledComponents/TextElements";
import { FlexDiv } from "../components/StyledComponents/Wrappers";
import { Loader } from "../components/Loader";

export const Customers = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCustomers()
      .then((response) => {
        setCustomers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Background>
      <FlexDiv
        borderRadius='10px'
        background={colors.LightPink}
        width='80%'
        height='min-content'
        dir='column'
        padding='40px'
        gap='20px'
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <StyledLink to={"/admin"}>
              <StyledButton>See all bookings</StyledButton>
            </StyledLink>
            {customers.map((customers) => {
              return (
                <FlexDiv key={customers._id} gap='10px' dir='column'>
                  <StyledP fontsize='18px'>{customers.name}</StyledP>
                  <StyledP fontsize='14px'>{customers.email}</StyledP>
                  <StyledP fontsize='14px'>{customers.phone}</StyledP>
                  <StyledLink to={"/admin/customers/" + customers._id}>
                    <StyledButton>GO TO CUSTOMER</StyledButton>
                  </StyledLink>
                </FlexDiv>
              );
            })}
            )
          </>
        )}
      </FlexDiv>
    </Background>
  );
};
