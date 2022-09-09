import { useState } from "react";
import styled from "styled-components";
import { IStylingProps } from "../StyledInterface";
import RightNav from "./RightNav";

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;
  padding: 10px;
  background-color: ${(props: IStylingProps) => props.backgroundColor};
  border-radius: 50%;
  cursor: pointer;

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
        backgroundColor={open ? "#5B93E2" : "#B992E8"}
        background={open ? "#4771ac" : "#F9F871"}
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
      <RightNav onClick={() => setOpen(!open)} open={open} />
    </>
  );
};

export default Burger;
