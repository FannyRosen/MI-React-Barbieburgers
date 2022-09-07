import { Background } from "../components/StyledComponents/Background";
import { colors } from "../components/StyledComponents/mixins";
import { StyledH2, StyledP } from "../components/StyledComponents/TextElements";
import { FlexDiv } from "../components/StyledComponents/Wrappers";

export const Contact = () => {
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
          <StyledH2>Contact us</StyledH2>
          <FlexDiv width='90%' dir='column' tabletdir='column' margin='20px'>
            <FlexDiv width='70%' dir='column' tabletdir='row'>
              <StyledP fontsize='18px' margin='20px' weight='bolder'>
                Phone:
              </StyledP>
              <StyledP fontsize='18px' margin='20px'>
                08-663 80 00
              </StyledP>
            </FlexDiv>
            <FlexDiv width='70%' dir='column' tabletdir='row'>
              <StyledP fontsize='18px' margin='20px' weight='bolder'>
                Email:
              </StyledP>
              <StyledP fontsize='18px' margin='20px'>
                barbieburgerssthlm@gmail.com
              </StyledP>
            </FlexDiv>
            <FlexDiv width='70%' dir='column' tabletdir='row'>
              <StyledP fontsize='16px' margin='20px' weight='bolder'>
                Adress:
              </StyledP>
              <StyledP fontsize='16px' margin='20px'>
                Strandvägen 1, 114 51 Stockholm
              </StyledP>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      </Background>
    </>
  );
};
