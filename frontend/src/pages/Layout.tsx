import { Outlet } from "react-router-dom";
import { Footer } from "../components/partials/Footer";
import { Header } from "../components/partials/Header";
import { GlobalStyle } from "../components/StyledComponents/Fonts";

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
