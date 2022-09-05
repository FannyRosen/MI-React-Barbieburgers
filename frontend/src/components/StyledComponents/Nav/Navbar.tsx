import styled from "styled-components";
import { Burger } from "./Burger";
import { colors } from "../mixins";

const Nav = styled.nav`
  width: 100%;

  display: flex;
  justify-content: center;
  background-color: ${colors.Blue};
`;

export const Navbar = () => {
  return (
    <Nav>
      <Burger></Burger>
    </Nav>
  );
};
