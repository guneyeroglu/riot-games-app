import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { CardLolChar, CardLolRegion } from '../../../components/Cards';
import { imagesCarousel, imagesOther } from '../../../components/Images/';
import FeaturedTitle from '../../../components/FeaturedTitle/FeaturedTitle';
import Spinner from '../../../components/Spinner/Spinner';
import { Icon } from '../../../components/Icons/Icon';
import DrawerRegion from '../../../components/Drawers/DrawerRegion/DrawerRegion';

import backgroundImageChampions from '../../../assets/images/lol/featured-champs-bg.jpeg';
import backgroundImageRegions from '../../../assets/images/lol/featured-regions-bg.jpeg.jpeg';

import { useFetchData, useChampionDialog } from '../../../global/utils';

import styles from './main.module.scss';

interface IChamp {
  background: {
    title: string;
    uri: string;
    width: number;
    height: number;
    x: number;
    y: number;
  };
  image: {
    title: string;
    uri: string;
    width: number;
    height: number;
    x: number;
    y: number;
  };
  name: string;
  slug: string;
}

interface IRegion {
  description: string;
  image: {
    title: string;
    subtitle: string;
    description: string;
    uri: string;
    width: number;
    height: number;
    x: number;
    y: number;
  };
  name: string;
  slug: string;
}

const Main = () => {
  const { t, i18n } = useTranslation();

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [imageId, setImageId] = useState<number>(1);
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

  const handleImagePrev = () => {
    if (imageId === 1) {
      setImageId(imagesCarousel.length);
    } else {
      setImageId((preValue) => preValue - 1);
    }
  };

  const handleImageNext = () => {
    if (imageId === imagesCarousel.length) {
      setImageId(1);
    } else {
      setImageId((preValue) => preValue + 1);
    }
  };

  const handleImageId = (id: number) => {
    setImageId(id);
  };

  const handleClassName = (number: number) => {
    let className = styles.images__item;

    if (number === imageId) {
      className += ` ${styles.active}`;
    }

    if (number === imageId - 1 || (imageId === 1 && number === imagesCarousel.length)) {
      className += ` ${styles.prev}`;
    }

    if (number === imageId + 1 || (imageId === imagesCarousel.length && number === 1)) {
      className += ` ${styles.next}`;
    }

    return className;
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__carousel}>
        <div
          className={styles['container__carousel--bg']}
          style={{
            backgroundImage: `url('${imagesCarousel[imageId - 1].url}')`,
          }}
        ></div>
        <div className={styles['container__carousel--content']}>
          <div className={styles.images}>
            {imagesCarousel.map((image) => (
              <div key={image.id} className={handleClassName(image.id)} onClick={() => handleImageId(image.id)}>
                <img src={image.url} alt={image.name} />
              </div>
            ))}
          </div>
          <div className={styles.directions}>
            <button className={`${styles.directions__button} ${styles.prev}`} onClick={handleImagePrev}>
              <Icon name='ArrowIcon' />
            </button>
            <div className={styles.directions__dots}>
              {imagesCarousel.map((image) => (
                <span key={image.id} className={styles.dot} onClick={() => handleImageId(image.id)}>
                  {image.id === imageId && <span className={styles.active}></span>}
                </span>
              ))}
            </div>
            <button className={`${styles.directions__button} ${styles.next}`} onClick={handleImageNext}>
              <Icon name='ArrowIcon' />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.container__featured}>
        <div className={styles.champions}>
          <div className={styles.champions__background} style={{ backgroundImage: `url(${backgroundImageChampions})` }}></div>
          <div className={styles.champions__wrapper}>
            <div className={styles.title}>
              <FeaturedTitle type='champions' />
            </div>
            <div className={styles.content}>
              {areChampionsLoading && <Spinner padding={true} />}
              {!areChampionsLoading &&
                featuredCharacters
                  .map((champName: string) => championsData?.champions.find((champ: IChamp) => champ.name.toUpperCase() === champName.toUpperCase()))
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
      <div className={styles.container__others}>
        {imagesOther.map((image) => (
          <div className={styles.links} key={image.id}>
            <div className={styles.links__wrapper}>
              <div className={styles.title}>
                <FeaturedTitle type={image.name} />
              </div>
              <div className={styles.content}>
                <Link to={image.name}>
                  <img src={image.url} alt={image.name} />
                </Link>
              </div>
              <div className={styles.nav}>
                <Link to={image.name}>
                  <span>{t(image.view)}</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openDrawer && <DrawerRegion open={openDrawer} onSetOpen={setOpenDrawer} region={regionName} />}
    </div>
  );
};

export default Main;
