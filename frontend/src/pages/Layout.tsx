import { Link, Outlet } from "react-router-dom";
import { Footer } from "../components/partials/Footer";
import { Header } from "../components/partials/Header";
import { GlobalStyle } from "../components/StyledComponents/Fonts";
import { Background } from "../components/StyledComponents/Background";

export const Layout = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet></Outlet>
      <Footer />
    </>
  );
};
