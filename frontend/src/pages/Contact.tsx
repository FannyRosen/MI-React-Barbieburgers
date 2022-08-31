import { Background } from "../components/StyledComponents/Background";
import { colors } from "../components/StyledComponents/mixins";
import { FlexDiv } from "../components/StyledComponents/Wrappers";

export const Contact = () => {
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
          <FlexDiv width="90%" dir="column" margin="20px"></FlexDiv>
        </FlexDiv>
      </Background>
    </>
  );
};
