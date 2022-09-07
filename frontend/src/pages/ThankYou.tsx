import { useLocation } from "react-router-dom";
import { Background } from "../components/StyledComponents/Background";
import { colors } from "../components/StyledComponents/mixins";
import { StyledP } from "../components/StyledComponents/TextElements";
import { FlexDiv } from "../components/StyledComponents/Wrappers";

export const ThankYou = () => {
  interface LocationState {
    date: Date;
    sittingTime: number;
    numberOfPeople: number;
    name: string;
    email: string;
    phone: string;
    id: string;
  }

  const location = useLocation();
  const state = location.state as LocationState;

  return (
    <Background>
      <FlexDiv
        borderRadius='10px'
        background={colors.LightPink}
        width='80%'
        height='min-content'
        minheight='40vh'
        dir='column'
      >
        <FlexDiv width='90%' dir='column' tabletdir='row' margin='20px'>
          <FlexDiv width='80%' dir='column'>
            <h2>Thank you {state.name}!</h2>
            <StyledP fontsize='20px' margin='20px'>
              Your booking is completed!
              <br /> A confirmation email has been sent to: {state.email}
            </StyledP>

            <StyledP fontsize='20px' margin='20px'>
              Date:{` `} {state.date.toLocaleDateString()} <br />
              Number of people:{` `}
              {state.numberOfPeople} <br />
              Booking number: {state.id}
            </StyledP>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </Background>
  );
};
