import background from "../../assets/background.png";
import { FlexDiv, ImageDiv } from "./Wrappers";

type BackgroundProps = {
  children: React.ReactNode;
};

export const Background = (props: BackgroundProps) => {
  return (
    <FlexDiv>
      <ImageDiv
        image={background}
        height="min-content"
        padding="50px 0"
        margin="0 50px 0 50px"
        minheight="70vh"
      >
        {props.children}
      </ImageDiv>
    </FlexDiv>
  );
};
