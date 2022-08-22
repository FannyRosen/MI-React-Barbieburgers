import { FlexDiv, ImageDiv } from "../components/StyledComponents/Wrappers";
import background from "../assets/background.png";

export const Home = () => {
  return (
    <FlexDiv>
      <ImageDiv image={background} height='100vh' margin='0 50px 0 50px'>
        <FlexDiv background=''></FlexDiv>
      </ImageDiv>
    </FlexDiv>
  );
};
