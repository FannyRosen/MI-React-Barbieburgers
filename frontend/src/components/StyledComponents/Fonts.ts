import { createGlobalStyle } from "styled-components";
import JosefinSlabSemiBold from "../../fonts/JosefinSlab-SemiBold.ttf";
import JosefinSlabLight from "../../fonts/JosefinSlab-Light.ttf";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'JosefinSlabSemiBold';
    src: url(${JosefinSlabSemiBold}) format('truetype');
    font-style: normal;
    font-display: auto;
  } @font-face {
    font-family: 'JosefinSlabLight';
    src: url(${JosefinSlabLight}) format('truetype');
    font-style: normal;
    font-display: auto;
  }
  
  h1,h2,h3,h4,h5 {
    font-family: 'JosefinSlabSemiBold';
  }
  p {
  font-family: 'JosefinSlabLight';
}
a, button, li, label, input {
  font-family: 'JosefinSlabLight';
  }
`;
