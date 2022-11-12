import { Route, Routes } from 'react-router';

import ScrollToTop from './global/scroll/ScrollToTop';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { Home } from './pages/Home';
import {
  Champions,
  Regions,
  Items,
  Ranks as LolRanks,
  Main as LolMain,
} from './pages/Lol';

import {
  Agents,
  Maps,
  Arsenal,
  Ranks as ValoRanks,
  Main as ValoMain,
} from './pages/Valo';

const App = () => {
  return (
    <ScrollToTop>
      <Header />
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
      <Footer />
    </ScrollToTop>
  );
};

export default App;
