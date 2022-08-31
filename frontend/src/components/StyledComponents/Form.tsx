import styled from "styled-components";
import { colors, device } from "./mixins";
import { IStylingProps } from "./StyledInterface";
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const Label = styled.label`
  margin: 5px 0;
`;
export const Input = styled.input`
  border: none;
  background-color: ${colors.Purple};
  padding: 7px;
  width: min-content;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  :hover {
    cursor: pointer;
  }
`;
