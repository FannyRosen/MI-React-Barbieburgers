import { Navbar } from "../../StyledComponents/Nav/Navbar";
import { FlexDiv } from "../StyledComponents/Wrappers";
import Logo from "../../assets/bb-logo.png";

import { LogoImage } from "../StyledComponents/Images";

export const Header = () => {
  return (
    <FlexDiv background="#B992E8" height="160px" dir="column">
      <LogoImage
        src={Logo}
        alt="Logo"
        width={"250px"}
        height={"x"}
        tabletwidth="390px"
      />
      <Navbar></Navbar>
    </FlexDiv>
  );
};
