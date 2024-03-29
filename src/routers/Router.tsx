import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ScrollToTop } from '../global/utils';
import Spinner from '../components/Spinner/Spinner';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Home = lazy(() => import('../pages/Home/Main/Home'));
const Champions = lazy(() => import('../pages/Lol/Champions/Champions'));
const Champion = lazy(() => import('../pages/Lol/Champions/Champion/Champion'));
const Regions = lazy(() => import('../pages/Lol/Regions/Regions'));
const LolMain = lazy(() => import('../pages/Lol/Main/Main'));
const Agents = lazy(() => import('../pages/Valo/Agents/Agents'));
const Maps = lazy(() => import('../pages/Valo/Maps/Maps'));
const Arsenal = lazy(() => import('../pages/Valo/Arsenal/Arsenal'));
const ValoMain = lazy(() => import('../pages/Valo/Main/Main'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const Router = () => {
  return (
    <ScrollToTop>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/leagueoflegends' element={<LolMain />} />
          <Route path='/leagueoflegends/champions' element={<Champions />} />
          <Route path='/leagueoflegends/champion/:championName' element={<Champion />} />
          <Route path='/leagueoflegends/regions' element={<Regions />} />
          <Route path='/valorant' element={<ValoMain />} />
          <Route path='/valorant/agents' element={<Agents />} />
          <Route path='/valorant/maps' element={<Maps />} />
          <Route path='/valorant/arsenal' element={<Arsenal />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </ScrollToTop>
  );
};

export default Router;
