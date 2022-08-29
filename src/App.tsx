import { Route, Routes } from 'react-router';
import Footer from './components/Footer/Footer';

import Header from './components/Header/Header';

import { Home } from './pages/Home';
import { Champions, Regions, Items, LolRanks, LolMain } from './pages/Lol';

import { Agents, Maps, Arsenal, ValoRanks, ValoMain } from './pages/Valo';

const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;
