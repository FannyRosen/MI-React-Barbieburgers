import { useState } from "react";
import styled from "styled-components";
import { IStylingProps } from "../../components/StyledComponents/StyledInterface";
import RightNav from "./RightNav";

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${(props: IStylingProps) => props.background || "white"};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${(props: IStylingProps) => props.transform1stchild};
    }

    &:nth-child(2) {
      transform: ${(props: IStylingProps) => props.transform2ndchild};
      opacity: ${(props: IStylingProps) => props.opacity2ndchild};
    }

    &:nth-child(3) {
      transform: ${(props: IStylingProps) => props.transform3rdchild};
    }
  }
`;

export const Burger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledBurger
        background={open ? "black" : "blue"}
        transform1stchild={open ? "rotate(45deg)" : "rotate(0)"}
        transform2ndchild={open ? "translateX(100%)" : "translateX(0)"}
        opacity2ndchild={open ? "0" : "1"}
        transform3rdchild={open ? "rotate(-45deg)" : "rotate(0)"}
        onClick={() => setOpen(!open)}
      >
        <div></div>
        <div></div>
        <div></div>
      </StyledBurger>
      <RightNav propsopen={open} />
    </>
  );
};

export default Burger;
