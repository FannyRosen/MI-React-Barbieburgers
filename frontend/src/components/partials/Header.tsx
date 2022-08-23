import { Navbar } from "../../StyledComponents/Nav/Navbar";
import { FlexDiv } from "../StyledComponents/Wrappers";
import Logo from "../../assets/bb-logo.png";

export const Header = () => {
  return (
    <FlexDiv background="#5B93E2" height="130px">
      <img src={Logo} alt="Logo" width={"400px"} />
      <Navbar></Navbar>
    </FlexDiv>
  );
};
