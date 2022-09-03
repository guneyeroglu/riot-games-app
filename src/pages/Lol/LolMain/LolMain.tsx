import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';
import useFetchData from '../../../global/hooks/useFetchData';

import { CardLolChar, CardLolRegion } from '../../../components/Cards';
import { imagesCarousel, imagesOther } from '../../../components/Images/';
import FeaturedTitle from '../../../components/FeaturedTitle/FeaturedTitle';
import Spinner from '../../../components/Spinner/Spinner';

import backgroundImageChampions from '../../../assets/images/lol/map-bg-1.jpeg';
import backgroundImageRegions from '../../../assets/images/lol/map-bg-2.jpeg';

import styles from './lol-main.module.scss';

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

const LolMain = () => {
  const { t, i18n } = useTranslation();

  const carouselGeneral = useRef<HTMLDivElement | any>(null);
  const carouselRegion = useRef<HTMLDivElement | any>(null);

  const [widthGeneral, setWidthGeneral] = useState<number>(0);
  const [widthRegion, setWidthRegion] = useState<number>(0);

  const featuredCharacters: string[] = [
    'VEX',
    'GWEN',
    'UDYR',
    'ZERI',
    'SAMIRA',
  ];

  const featuredRegions: string[] = [
    'NOXUS',
    'IONIA',
    'DEMACIA',
    'IXTAL',
    'PILTOVER',
    'SHURIMA',
  ];

  const { data, isLoading, refetch } = useFetchData('lol-champions-regions');

  useEffect(() => {
    document.title = t('pageLolHome');
    document.documentElement.lang = i18n.language.slice(0, 2);

    const scrollWidthGeneral = carouselGeneral.current?.scrollWidth;
    const offsetWidthGeneral = carouselGeneral.current?.offsetWidth;

    const scrollWidthRegion = carouselRegion.current?.scrollWidth;
    const offsetWidthRegion = carouselRegion.current?.offsetWidth;

    setWidthGeneral(scrollWidthGeneral - offsetWidthGeneral);

    setWidthRegion(scrollWidthRegion - offsetWidthRegion);

    refetch();
  }, [t, i18n, refetch, isLoading]);

  return (
    <div className={styles.container}>
      <motion.div
        ref={carouselGeneral}
        whileTap={{ cursor: 'grabbing' }}
        whileHover={{ cursor: 'grab' }}
        className={styles.container__carousel}
      >
        <motion.div
          drag={'x'}
          dragConstraints={{ right: 0, left: -widthGeneral }}
          className={styles['container__carousel--inner']}
        >
          {imagesCarousel.map((image) => (
            <motion.div key={image.id} className={styles.item}>
              <img src={image.url} alt={image.name} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <div className={styles.container__featured}>
        <div className={styles.champions}>
          <div
            className={styles.champions__background}
            style={{ backgroundImage: `url(${backgroundImageChampions})` }}
          ></div>
          <div className={styles.champions__wrapper}>
            <div className={styles.title}>
              <FeaturedTitle type='champions' />
            </div>
            <div className={styles.content}>
              {isLoading && <Spinner />}
              {!isLoading &&
                featuredCharacters
                  .map((champName: string) =>
                    data?.champions.find(
                      (champ: IChamp) =>
                        champ.name.toUpperCase() === champName.toUpperCase()
                    )
                  )
                  .map((champ: IChamp) => (
                    <CardLolChar data={champ} key={champ.name} />
                  ))}
            </div>
            <div className={styles.nav}>
              <Link to='champions'>
                <span>{t('viewChamps')}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.regions}>
          <div
            className={styles.regions__background}
            style={{ backgroundImage: `url(${backgroundImageRegions})` }}
          ></div>
          <div className={styles.regions__wrapper}>
            <div className={styles.title}>
              <FeaturedTitle type='regions' />
            </div>
            <div className={styles.content}>
              <motion.div
                ref={carouselRegion}
                whileTap={{ cursor: 'grabbing' }}
                whileHover={{ cursor: 'grab' }}
                className={styles.carousel}
              >
                <motion.div
                  drag={'x'}
                  dragConstraints={{ right: 0, left: -widthRegion }}
                  className={styles.carousel__inner}
                >
                  {!isLoading &&
                    featuredRegions
                      .map((regionName: string) =>
                        data?.factions.find(
                          (region: IRegion) =>
                            regionName.toLowerCase() ===
                            region.name.toLowerCase()
                        )
                      )
                      .map((region: IRegion) => (
                        <CardLolRegion key={region.name} region={region} />
                      ))}
                </motion.div>
              </motion.div>
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
    </div>
  );
};

export default LolMain;
