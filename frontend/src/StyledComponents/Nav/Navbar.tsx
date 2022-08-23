import styled from "styled-components";
import { Burger } from "./Burger";

const Nav = styled.nav`
  width: 100%;
  height: 25px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
`;

export const Navbar = () => {
  return (
    <Nav>
      <Burger></Burger>
    </Nav>
  );
};
