import { FlexDiv } from "../components/StyledComponents/Wrappers";
import burgers from "../assets/blueburger.jpeg";
import { colors } from "../components/StyledComponents/mixins";
import { StyledP } from "../components/StyledComponents/TextElements";
import { Background } from "../components/StyledComponents/Background";

export const Home = () => {
  return (
    <>
      <Background>
        <FlexDiv
          borderRadius='10px'
          background={colors.LightPink}
          width='80%'
          height='min-content'
          dir='column'
        >
          <h2>Welcome</h2>
          <FlexDiv width='90%' dir='column' tabletdir='row' margin='20px'>
            <FlexDiv width='50%'>
              <StyledP fontsize='20px' margin='20px'>
                We are a cute lite burger bar where you can eat burgers and
                drink milkshakes. We have strawberry, vanilla and chocolate
                milkshakes.
              </StyledP>
            </FlexDiv>
            <FlexDiv width='50%' margin='20px' borderRadius='6px'>
              <img src={burgers} alt='Yummy burger' width='270' />
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      </Background>
    </>
  );
};
