import { Link } from "react-router-dom";
import styled from "styled-components";
import { IStylingProps } from "./StyledInterface";

export const StyledP = styled.p`
  display: ${(props: IStylingProps) => props.display || "block"};
  color: ${(props: IStylingProps) => props.color || "black"};
  margin: ${(props: IStylingProps) => props.margin || "0"};
  padding: ${(props: IStylingProps) => props.padding || "0"};
  font-size: ${(props: IStylingProps) => props.fontsize || "12px"};
  text-align: ${(props: IStylingProps) => props.textAlign || "center"};
  text-decoration: ${(props: IStylingProps) => props.decor || "none"};
  font-weight: ${(props: IStylingProps) => props.weight || "normal"};
  :hover {
    cursor: ${(props: IStylingProps) => props.hover || "auto"};
  }
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

export const StyledHr = styled.hr`
  width: 200px;
`;

export const StyledH2 = styled.h2`
  padding-top: 40px;
`;

export const StyledSelect = styled.select`
  background-color: white;
  border: 1px solid grey;
  border-radius: 2px;
  font-family: "JosefinSlabSemiBold";
  padding: 3px;
`;
