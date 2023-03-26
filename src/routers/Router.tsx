import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ScrollToTop } from '../global/utils';
import Spinner from '../components/Spinner/Spinner';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Home = lazy(() => import('../pages/Home/Main/Home'));
const Champions = lazy(() => import('../pages/Lol/Champions/Champions'));
const Regions = lazy(() => import('../pages/Lol/Regions/Regions'));
const Items = lazy(() => import('../pages/Lol/Items/Items'));
const LolMain = lazy(() => import('../pages/Lol/Main/Main'));
const Agents = lazy(() => import('../pages/Valo/Agents/Agents'));
const Maps = lazy(() => import('../pages/Valo/Maps/Maps'));
const Arsenal = lazy(() => import('../pages/Valo/Arsenal/Arsenal'));
const ValoMain = lazy(() => import('../pages/Valo/Main/Main'));

const Router = () => {
  return (
    <ScrollToTop>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/leagueoflegends' element={<LolMain />} />
          <Route path='/leagueoflegends/champions' element={<Champions />} />
          <Route path='/leagueoflegends/champions/:champion' element={<Champions />} />
          <Route path='/leagueoflegends/regions' element={<Regions />} />
          <Route path='/leagueoflegends/items' element={<Items />} />
          <Route path='/valorant' element={<ValoMain />} />
          <Route path='/valorant/agents' element={<Agents />} />
          <Route path='/valorant/maps' element={<Maps />} />
          <Route path='/valorant/arsenal' element={<Arsenal />} />
        </Routes>
      </Suspense>
      <Footer />
    </ScrollToTop>
  );
};

export default Router;
