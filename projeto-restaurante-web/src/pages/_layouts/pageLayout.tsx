import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Main } from "./styles";
import { Footer } from "../../components/Footer/Footer";

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
