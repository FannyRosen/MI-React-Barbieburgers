import styled from "styled-components";
import { device } from "./mixins";
import { IStylingProps } from "./StyledInterface";

export const LogoImage = styled.img`
  width: ${(props: IStylingProps) => props.width || "100%"};
  height: ${(props: IStylingProps) => props.height || "100%"};

  @media ${device.tablet} {
    width: ${(props: IStylingProps) => props.tabletwidth || props.width};
    height: ${(props: IStylingProps) => props.tabletheight || props.height};
  }

  @media ${device.laptop} {
    width: ${(props: IStylingProps) => props.laptopwidth || props.tabletwidth};
    height: ${(props: IStylingProps) =>
      props.laptopheight || props.tabletheight};
  }
`;
