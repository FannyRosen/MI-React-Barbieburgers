import styled from "styled-components";
import { device } from "./mixins";
import { IStylingProps } from "./StyledInterface";
import { colors } from "./mixins";

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props: IStylingProps) =>
    props.background || colors.Purple};
  border: none;
  width: ${(props: IStylingProps) => props.width || "200px"};
  height: ${(props: IStylingProps) => props.height || "40px"};
  margin: ${(props: IStylingProps) => props.margin || "0"};
  padding: ${(props: IStylingProps) => props.padding || "0"};
  color: ${(props: IStylingProps) => props.color || "white"};
  border-radius: ${(props: IStylingProps) => props.borderRadius || "10px"};
  @media ${device.tablet} {
    flex-direction: ${(props: IStylingProps) => props.tabletdir || props.dir};
    align-items: ${(props: IStylingProps) => props.tabletalign || props.align};
    justify-content: ${(props: IStylingProps) =>
      props.tabletjustify || props.justify};
    flex-wrap: ${(props: IStylingProps) => props.tabletwrap || props.wrap};
    width: ${(props: IStylingProps) => props.tabletwidth || props.width};
    height: ${(props: IStylingProps) => props.tabletheight || props.height};
  }
  @media ${device.laptop} {
    flex-direction: ${(props: IStylingProps) =>
      props.laptopdir || props.tabletdir};

    align-items: ${(props: IStylingProps) =>
      props.laptopalign || props.tabletalign};
    justify-content: ${(props: IStylingProps) =>
      props.laptopjustify || props.tabletjustify};
    flex-wrap: ${(props: IStylingProps) =>
      props.laptopwrap || props.tabletwrap};
    width: ${(props: IStylingProps) => props.laptopwidth || props.tabletwidth};
    height: ${(props: IStylingProps) =>
      props.laptopheight || props.tabletheight};
  }
`;
