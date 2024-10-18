import { ScrollUp } from '../../components/ScrollUp/ScrollUp';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { MainPage } from './styles';

export function PageLayout() {
  return (
    <>
      <ScrollUp /> {/* Componente para rolar ao topo ao mudar de rota */}
      <MainPage>
        <Header />
        <Outlet />
        <Footer />
      </MainPage>
    </>
  );
}
