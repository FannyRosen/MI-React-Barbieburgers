import background from "../assets/background.png";
import { FlexDiv, ImageDiv } from "../components/StyledComponents/Wrappers";

type BackgroundProps = {
  children: React.ReactNode;
};

export const Background = (props: BackgroundProps) => {
  return (
    <FlexDiv>
      <ImageDiv image={background} height="100vh" margin="0 50px 0 50px">
        {props.children}
      </ImageDiv>
    </FlexDiv>
  );
};
