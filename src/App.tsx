import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { ScrollToTop } from './global/utils';
import Spinner from './components/Spinner/Spinner';

const Home = lazy(() => import('./pages/Home/Main/Home'));
const Champions = lazy(() => import('./pages/Lol/Champions/Champions'));
const Regions = lazy(() => import('./pages/Lol/Regions/Regions'));
const Items = lazy(() => import('./pages/Lol/Items/Items'));
const LolRanks = lazy(() => import('./pages/Lol/Ranks/Ranks'));
const LolMain = lazy(() => import('./pages/Lol/Main/Main'));
const Agents = lazy(() => import('./pages/Valo/Agents/Agents'));
const Maps = lazy(() => import('./pages/Valo/Maps/Maps'));
const Arsenal = lazy(() => import('./pages/Valo/Arsenal/Arsenal'));
const ValoRanks = lazy(() => import('./pages/Valo/Ranks/Ranks'));
const ValoMain = lazy(() => import('./pages/Valo/Main/Main'));

const App = () => {
  return (
    <ScrollToTop>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/leagueoflegends' element={<LolMain />} />
          <Route path='/leagueoflegends/champions' element={<Champions />} />
          <Route path='/leagueoflegends/regions' element={<Regions />} />
          <Route path='/leagueoflegends/items' element={<Items />} />
          <Route path='/leagueoflegends/ranks' element={<LolRanks />} />
          <Route path='/valorant' element={<ValoMain />} />
          <Route path='/valorant/agents' element={<Agents />} />
          <Route path='/valorant/maps' element={<Maps />} />
          <Route path='/valorant/arsenal' element={<Arsenal />} />
          <Route path='/valorant/ranks' element={<ValoRanks />} />
        </Routes>
      </Suspense>
      <Footer />
    </ScrollToTop>
  );
};

export default App;
