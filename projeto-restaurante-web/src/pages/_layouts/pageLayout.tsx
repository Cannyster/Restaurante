import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { MainPage } from './styles';

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
