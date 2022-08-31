import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { FoodMenu } from "./pages/FoodMenu";
import { ThankYou } from "./pages/ThankYou";
import { Book } from "./components/Book";
import { SingleBooking } from "./components/SingleBooking";
import { Customers } from "./components/Customers";
import { Customer } from "./components/Customer";
import { AdminBookings } from "./components/AdminBooking";
import ScrollToTop from "./components/partials/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path="/menu" element={<FoodMenu />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/book" element={<Book />}></Route>
              <Route path="/thankyou" element={<ThankYou />}></Route>
              <Route path="/admin">
                <Route index element={<AdminBookings />}></Route>
                <Route path=":id" element={<SingleBooking />}></Route>
              </Route>
              <Route path="/admin/customers">
                <Route index element={<Customers />}></Route>
                <Route path=":id" element={<Customer />}></Route>
              </Route>
              <Route path="*" element={<NotFound />}></Route>
            </Route>
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
}

export default App;
