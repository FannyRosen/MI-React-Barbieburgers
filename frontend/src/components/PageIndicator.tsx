import { colors } from "./StyledComponents/mixins";
import { FlexDiv } from "./StyledComponents/Wrappers";

interface IPhase {
  phase: number;
}
export const PageIndicator = (phase: IPhase) => {
  return (
    <FlexDiv gap="10px" margin="10px 0">
      <FlexDiv
        background={colors.Purple}
        height="20px"
        width="20px"
        borderRadius="50%"
        border="2px solid black"
      />
      <FlexDiv
        background={phase.phase >= 2 ? colors.Purple : colors.LightPink}
        height="20px"
        width="20px"
        borderRadius="50%"
        border="2px solid black"
      />
      <FlexDiv
        background={phase.phase >= 3 ? colors.Purple : colors.LightPink}
        height="20px"
        width="20px"
        borderRadius="50%"
        border="2px solid black"
      />
      <FlexDiv
        background={phase.phase >= 4 ? colors.Purple : colors.LightPink}
        height="20px"
        width="20px"
        borderRadius="50%"
        border="2px solid black"
      />
    </FlexDiv>
  );
};
