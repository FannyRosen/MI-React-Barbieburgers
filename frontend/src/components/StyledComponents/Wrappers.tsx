import styled from "styled-components";
import { device } from "./mixins";
import { IStylingProps } from "./StyledInterface";

export const FlexDiv = styled.div`
  display: flex;
  position: ${(props: IStylingProps) => props.position || ""};
  flex-direction: ${(props: IStylingProps) => props.dir || "row"};
  align-items: ${(props: IStylingProps) => props.align || "center"};
  justify-content: ${(props: IStylingProps) => props.justify || "center"};
  flex-wrap: ${(props: IStylingProps) => props.wrap || "nowrap"};
  background-color: ${(props: IStylingProps) => props.background || "none"};
  width: ${(props: IStylingProps) => props.width || "100%"};
  height: ${(props: IStylingProps) => props.height || "100%"};
  gap: ${(props: IStylingProps) => props.gap || "0"};
  margin: ${(props: IStylingProps) => props.margin || "0"};
  padding: ${(props: IStylingProps) => props.padding || "0"};
  border-radius: ${(props: IStylingProps) => props.borderRadius || "0"};
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

export const ImageDiv = styled(FlexDiv)`
  background-image: url(${(props: IStylingProps) => props.image || ""});
  width: ${(props: IStylingProps) => props.width || "100%"};
  height: ${(props: IStylingProps) => props.height || "100%"};
  margin: ${(props: IStylingProps) => props.margin || "0"};
  padding: ${(props: IStylingProps) => props.padding || "0"};
  background-repeat: no-repeat;
  //background-size: 100%;
  //background-position: 68% 65%;
  position: ${(props: IStylingProps) => props.position || ""};
`;
