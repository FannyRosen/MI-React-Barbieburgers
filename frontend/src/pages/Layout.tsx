import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div className="layout-container">
        <header>
          <h1>Barbie Burgers</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </header>
        <footer>
          <h4>Footer</h4>
        </footer>
        <Outlet></Outlet>
      </div>
    </>
  );
};
