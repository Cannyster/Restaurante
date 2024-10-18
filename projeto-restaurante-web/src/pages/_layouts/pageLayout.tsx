import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { MainPage } from "./styles";
import { Footer } from "../../components/Footer/Footer";

export function PageLayout() {
  return (
    <>
      <MainPage>
        <Header />
        <Outlet />
        <Footer />
      </MainPage>
    </>
  );
}
