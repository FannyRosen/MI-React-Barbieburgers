import { Navbar } from "../../StyledComponents/Nav/Navbar";
import { FlexDiv, ImageDiv } from "../StyledComponents/Wrappers";
import Logo from "../../assets/bb-logo.png";
import { LogoImage } from "../StyledComponents/Images";
import GrainHeader from "../../assets/grain-header.png";

export const Header = () => {
  return (
    <FlexDiv background="#B992E8" height="160px" dir="column">
      <ImageDiv image={GrainHeader}>
        <LogoImage
          src={Logo}
          alt="Logo"
          width={"250px"}
          height={"x"}
          tabletwidth="390px"
        />
      </ImageDiv>
      <Navbar></Navbar>
    </FlexDiv>
  );
};
