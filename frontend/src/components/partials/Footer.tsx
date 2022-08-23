import { GlobalStyle } from "../StyledComponents/Fonts";
import { StyledP } from "../StyledComponents/TextElements";
import { FlexDiv } from "../StyledComponents/Wrappers";

export const Footer = () => {
  return (
    <>
      <GlobalStyle />
      <FlexDiv background="#006D5D" height="100px">
        <StyledP fontsize="20px" color="white">
          Barbie Burgers <br />
          AB Copyright 2022
        </StyledP>
      </FlexDiv>
    </>
  );
};
