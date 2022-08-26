import { Background } from "../components/StyledComponents/Background";
import { colors } from "../components/StyledComponents/mixins";
import { StyledP } from "../components/StyledComponents/TextElements";
import { FlexDiv } from "../components/StyledComponents/Wrappers";

export const ThankYou = () => {
  return (
    <>
      <Background>
        <FlexDiv
          borderRadius="10px"
          background={colors.LightPink}
          width="80%"
          height="min-content"
          dir="column"
        >
          <FlexDiv width="90%" dir="column" tabletdir="row" margin="20px">
            <FlexDiv width="80%" dir="column">
              <h2>Thank you!</h2>
              <StyledP fontsize="20px" margin="20px">
                Your booking is completed! A confirmation email has been sent
                to:
              </StyledP>
              <StyledP fontsize="20px" margin="20px">
                Email PlaceHolder
              </StyledP>
              <StyledP fontsize="20px" margin="20px">
                Booking Number PlaceHolder
              </StyledP>
              <StyledP fontsize="20px" margin="20px">
                Booking PlaceHolder
              </StyledP>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      </Background>
    </>
  );
};
