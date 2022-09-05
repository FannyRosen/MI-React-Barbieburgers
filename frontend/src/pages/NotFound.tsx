import { Link } from "react-router-dom";
import styled from "styled-components";
import { Background } from "../components/StyledComponents/Background";
import { colors } from "../components/StyledComponents/mixins";
import { StyledP } from "../components/StyledComponents/TextElements";
import { FlexDiv } from "../components/StyledComponents/Wrappers";

export const NotFound = () => {
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
              <h2> Ooops! Something went wrong..</h2>
              <Link to="/">
                <StyledP fontsize="20px" margin="20px">
                  Return to homepage
                </StyledP>
              </Link>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      </Background>
    </>
  );
};
