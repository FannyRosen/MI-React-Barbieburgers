import { GlobalStyle } from "../StyledComponents/Fonts";
import { StyledP } from "../StyledComponents/TextElements";
import { FlexDiv } from "../StyledComponents/Wrappers";

export const Footer = () => {
  return (
    <>
      <GlobalStyle />
      <FlexDiv>
        <StyledP fontsize="20px">Copyright</StyledP>
      </FlexDiv>
    </>
  );
};
