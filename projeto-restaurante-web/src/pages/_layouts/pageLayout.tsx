import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Main } from "./styles";
import { Footer } from "../../components/Footer/index";

export function PageLayout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}
