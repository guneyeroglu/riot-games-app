import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';

import FeaturedTitle from '../../../components/FeaturedTitle/FeaturedTitle';

import { images } from '../../../components/Images/';
import backgroundImageChampions from '../../../assets/images/lol/map-bg-1.jpeg';
import backgroundImageRegions from '../../../assets/images/lol/map-bg-2.jpeg';

import styles from './lol-main.module.scss';

interface IImage {
  id: number;
  name: string;
  url: string;
}

const LolMain = () => {
  const { t, i18n } = useTranslation();

  const slider = useRef<HTMLDivElement | any>(null);

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    document.title = t('pageLolHome');
    document.documentElement.lang = i18n.language.slice(0, 2);
    const scrollWidth = slider.current?.scrollWidth;
    const offsetWidth = slider.current?.offsetWidth;
    setWidth(scrollWidth - offsetWidth);
  }, [t, i18n]);

  return (
    <div className={styles.container}>
      <motion.div
        ref={slider}
        whileTap={{ cursor: 'grabbing' }}
        whileHover={{ cursor: 'grab' }}
        className={styles.container__slider}
      >
        <motion.div
          drag={'x'}
          dragConstraints={{ right: 0, left: -width }}
          className={styles['container__slider--inner']}
        >
          {images.map((image: IImage) => (
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
            <div className={styles['champions__wrapper--title']}>
              <FeaturedTitle type='champions' />
            </div>
            <div className={styles['champions__wrapper--content']}>
              CARD ITEM
            </div>
            <div className={styles['champions__wrapper--nav']}>
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
            <div className={styles['regions__wrapper--title']}>
              <FeaturedTitle type='regions' />
            </div>
            <div className={styles['regions__wrapper--content']}>
              Dizayn ve düşün
            </div>
            <div className={styles['regions__wrapper--nav']}>
              <Link to='regions'>
                <span>{t('viewRegions')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container__nav}></div>
    </div>
  );
};

export default LolMain;
