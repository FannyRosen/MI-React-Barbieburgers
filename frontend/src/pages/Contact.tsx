import { text } from "stream/consumers";
import { Background } from "../components/StyledComponents/Background";
import { Form, Input, Label } from "../components/StyledComponents/Form";
import { colors } from "../components/StyledComponents/mixins";
import {
  StyledLabel,
  StyledP,
} from "../components/StyledComponents/TextElements";
import { FlexDiv } from "../components/StyledComponents/Wrappers";

export const Contact = () => {
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
          <h2>Contact us</h2>
          <FlexDiv width="90%" dir="column" tabletdir="column" margin="20px">
            <FlexDiv width="70%" dir="column" tabletdir="row">
              <StyledP fontsize="20px" margin="20px" weight="bolder">
                Phone:
              </StyledP>
              <StyledP fontsize="20px" margin="20px">
                08-663 80 00
              </StyledP>
            </FlexDiv>
            <FlexDiv width="70%" dir="column" tabletdir="row">
              <StyledP fontsize="20px" margin="20px" weight="bolder">
                Email:
              </StyledP>
              <StyledP fontsize="20px" margin="20px">
                barbieburgerssthlm@gmail.com
              </StyledP>
            </FlexDiv>
            <FlexDiv width="70%" dir="column" tabletdir="row">
              <StyledP fontsize="20px" margin="20px" weight="bolder">
                Adress:
              </StyledP>
              <StyledP fontsize="20px" margin="20px">
                Strandvägen 1, 114 51 Stockholm
              </StyledP>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      </Background>
    </>
  );
};
