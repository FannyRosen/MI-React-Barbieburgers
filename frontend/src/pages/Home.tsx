import { FlexDiv, ImageDiv } from "../components/StyledComponents/Wrappers";
import background from "../assets/background.png";
import burgers from "../assets/burgers.png";
import { colors } from "../components/StyledComponents/mixins";
import { StyledP } from "../components/StyledComponents/TextElements";
import { Background } from "../StyledComponents/Background";

export const Home = () => {
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
          <h2>Welcome</h2>
          <FlexDiv width="90%" dir="column" tabletdir="row" margin="20px">
            <FlexDiv width="50%">
              <StyledP fontsize="20px" margin="20px">
                We are a cute lite burger bar where you can eat burgers and
                drink milkshakes. We have strawberry, vanilla and chocolate
                milkshakes.
              </StyledP>
            </FlexDiv>
            <img src={burgers} alt="Yummy burger" width="250" />
          </FlexDiv>
        </FlexDiv>
      </Background>
    </>
  );
};
