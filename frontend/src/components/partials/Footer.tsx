import { GlobalStyle } from "../StyledComponents/Fonts";
import { LogoImage } from "../StyledComponents/Images";
import { StyledP } from "../StyledComponents/TextElements";
import { FlexDiv, ImageDiv } from "../StyledComponents/Wrappers";
import Logo from "../../assets/bb-logo.png";
import GrainFooter from "../../assets/grain-footer.png";

export const Footer = () => {
  return (
    <>
      <GlobalStyle />
      <FlexDiv background="#006D5D" height="100px">
        <ImageDiv image={GrainFooter}>
          <FlexDiv dir="column">
            <LogoImage src={Logo} alt="Logo" width={"150px"} height={"x"} />
            <StyledP textAlign="center" fontsize="16px" color="white">
              Barbie Burgers <br />
              AB Copyright 2022
            </StyledP>
          </FlexDiv>
        </ImageDiv>
      </FlexDiv>
    </>
  );
};
