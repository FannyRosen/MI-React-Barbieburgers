import { Link } from "react-router-dom";
import styled from "styled-components";
import { IStylingProps } from "../StyledInterface";
import { colors } from "../mixins";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 0 10px 0 10px;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: ${colors.Blue};
    position: fixed;
    transform: ${(props: IStylingProps) => props.ultransform};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: white;
      margin-bottom: 40px;
    }
  }
`;

interface IOpen {
  open: boolean;
}

const RightNav = (propsopen: IOpen) => {
  return (
    <Ul ultransform={propsopen.open ? "translateX(0)" : "translateX(100%)"}>
      <li>
        <Link to="/menu">MENU</Link>
      </li>
      <li>
        <Link to="/contact">CONTACT</Link>
      </li>
      <li>
        <Link to="/book">BOOK</Link>
        {""}
      </li>
    </Ul>
  );
};

export default RightNav;
