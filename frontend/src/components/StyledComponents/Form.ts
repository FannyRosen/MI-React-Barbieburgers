import styled from "styled-components";
import { colors } from "../StyledComponents/mixins";
export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  border: none;
  background-color: ${colors.Purple};
  padding: 7px;
  width: 80px;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
