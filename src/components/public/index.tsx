import Header from "./components/page/header/header";
import Footer from "./components/page/footer/footer";
import { Outlet } from "react-router-dom";

function Public() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Public;
