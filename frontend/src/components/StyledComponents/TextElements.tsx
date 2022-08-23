import styled from "styled-components";
import { IStylingProps } from "./StyledInterface";

export const StyledP = styled.p`
  color: ${(props: IStylingProps) => props.color || "black"};
  margin: ${(props: IStylingProps) => props.margin || "0"};
  padding: ${(props: IStylingProps) => props.padding || "0"};
  font-size: ${(props: IStylingProps) => props.fontsize || "12px"};
  text-align: ${(props: IStylingProps) => props.textAlign || "center"};
`;

export const StyledA = styled.a`
  color: ${(props: IStylingProps) => props.color || "black"};
`;
