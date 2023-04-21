import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { CardLolChar, CardLolRegion } from '../../../components/Cards';
import { imagesCarousel } from '../../../components/Images/';
import FeaturedTitle from '../../../components/FeaturedTitle/FeaturedTitle';
import Spinner from '../../../components/Spinner/Spinner';
import DrawerRegion from '../../../components/Drawers/DrawerRegion/DrawerRegion';
import { CarouselLolMain } from '../../../components/Carousels';

import backgroundImageChampions from '../../../assets/images/lol/featured-champs-bg.jpeg';
import backgroundImageRegions from '../../../assets/images/lol/featured-regions-bg.jpeg';

import { useFetchData, useChampionDialog } from '../../../global/utils';

import styles from './main.module.scss';

interface IChamp {
  background: { title: string; uri: string; width: number; height: number; x: number; y: number };
  image: { title: string; uri: string; width: number; height: number; x: number; y: number };
  name: string;
  slug: string;
}

interface IRegion {
  description: string;
  image: { title: string; subtitle: string; description: string; uri: string; width: number; height: number; x: number; y: number };
  name: string;
  slug: string;
}

const Main = () => {
  const { t, i18n } = useTranslation();

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [regionName, setRegionName] = useState<string>('');

  const featuredCharacters: string[] = ['VEX', 'GWEN', 'UDYR', 'ZERI', 'SAMIRA'];

  const featuredRegions: string[] = ['NOXUS', 'IONIA', 'DEMACIA', 'PILTOVER', 'TARGON', 'SHURIMA'];

  const { data: championsData, isLoading: areChampionsLoading, refetch: refetchChampions } = useFetchData('lol-champions');
  const { data: regionsData, isLoading: areRegionsLoading, refetch: refetchRegions } = useFetchData('lol-regions');

  const { openModal, setOpenModal, championName, setChampionName, DialogLolChampion } = useChampionDialog();

  useEffect(() => {
    document.title = t('pageLolHome');
    document.documentElement.lang = i18n.language.slice(0, 2);

    refetchChampions();
    refetchRegions();
  }, [t, i18n, areChampionsLoading, areRegionsLoading, refetchChampions, refetchRegions]);

  const handleDrawer = (name: string) => {
    setOpenDrawer((prevValue) => !prevValue);
    setRegionName(name);
  };

  return (
    <div className={styles.container}>
      <CarouselLolMain images={imagesCarousel} />
      <div className={styles.container__featured}>
        <div className={styles.champions}>
          <div className={styles.champions__background} style={{ backgroundImage: `url(${backgroundImageChampions})` }}></div>
          <div className={styles.champions__wrapper}>
            <div className={styles.title}>
              <FeaturedTitle type='champions' />
            </div>
            <div className={styles.content}>
              {areChampionsLoading && <Spinner />}
              {!areChampionsLoading &&
                featuredCharacters
                  .map((champName: string) =>
                    championsData?.champions.find((champ: IChamp) => champ.name.toLocaleUpperCase('en-US') === champName.toLocaleUpperCase('en-US')),
                  )
                  .map((champ: IChamp) => <CardLolChar key={champ.name} data={champ} onSetOpen={setOpenModal} onSetChampionName={setChampionName} />)}
              <DialogLolChampion open={openModal} onSetOpen={setOpenModal} championName={championName} />
            </div>
            <div className={styles.nav}>
              <Link to='champions'>
                <span>{t('viewChamps')}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.regions}>
          <div className={styles.regions__background} style={{ backgroundImage: `url(${backgroundImageRegions})` }}></div>
          <div className={styles.regions__wrapper}>
            <div className={styles.title}>
              <FeaturedTitle type='regions' />
            </div>
            <div className={styles.content}>
              {areRegionsLoading && <Spinner />}
              {!areRegionsLoading &&
                featuredRegions
                  .map((regionName: string) => regionsData?.factions.find((region: IRegion) => regionName.toLowerCase() === region.name.toLowerCase()))
                  .map((region: IRegion) => <CardLolRegion key={region.name} region={region} onSetDrawer={handleDrawer} />)}
            </div>
            <div className={styles.nav}>
              <Link to='regions'>
                <span>{t('viewRegions')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <DrawerRegion open={openDrawer} onSetOpen={setOpenDrawer} region={regionName} onSetRegion={setRegionName} />
    </div>
  );
};

export default Main;
