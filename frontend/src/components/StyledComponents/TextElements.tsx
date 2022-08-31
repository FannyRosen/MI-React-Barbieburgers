import { Link } from "react-router-dom";
import styled from "styled-components";
import { IStylingProps } from "./StyledInterface";

export const StyledP = styled.p`
  color: ${(props: IStylingProps) => props.color || "black"};
  margin: ${(props: IStylingProps) => props.margin || "0"};
  padding: ${(props: IStylingProps) => props.padding || "0"};
  font-size: ${(props: IStylingProps) => props.fontsize || "12px"};
  text-align: ${(props: IStylingProps) => props.textAlign || "center"};
  font-weight: ${(props: IStylingProps) => props.weight || "normal"};
`;

export const StyledA = styled.a`
  color: ${(props: IStylingProps) => props.color || "white"};
  text-decoration: ${(props: IStylingProps) => props.textDecoration || "none"};
`;

export const StyledLabel = styled.label`
  color: ${(props: IStylingProps) => props.color || "black"};
`;

export const StyledLink = styled(Link)`
  color: ${(props: IStylingProps) => props.color || "white"};
  text-decoration: ${(props: IStylingProps) => props.textDecoration || "none"};
`;
