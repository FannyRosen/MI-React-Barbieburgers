import { Link } from "react-router-dom";
import styled from "styled-components";
import { IStylingProps } from "../StyledInterface";
import { colors } from "../mixins";
import { ReactNode, useState } from "react";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  padding: 0;

  li {
    color: white;
    display: inline;
    list-style: none;
    padding: 5px 20px 5px 20px;
    margin: 0 40px 0 40px;
  }

  a {
    color: white;
    text-decoration: none;
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
      margin-bottom: 40px;
      padding: 0 20px 0 20px;
    }
  }
`;

interface IProps {
  open: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const RightNav = (props: IProps) => {
  return (
    <Ul ultransform={props.open ? "translateX(0)" : "translateX(100%)"}>
      <li>
        <Link onClick={props.onClick} to='/contact'>
          CONTACT
        </Link>
      </li>
      <li>
        <Link onClick={props.onClick} to='/book'>
          BOOK
        </Link>
      </li>
    </Ul>
  );
};

export default RightNav;
