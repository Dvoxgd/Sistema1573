import { Outlet } from "react-router-dom";
import MainHeader from "./common/MainHeader";
import MainNav from "./common/MainNav";
import MainFooter from "./common/MainFooter";

function Layout() {
  return (
    <>
      <MainHeader />
      <MainNav />
      <div id="main-content">
        <Outlet />
      </div>
      <MainFooter />
    </>
  );
}

export default Layout;
