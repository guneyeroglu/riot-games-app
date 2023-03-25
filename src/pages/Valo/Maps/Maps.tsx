import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazy-load';

import Spinner from '../../../components/Spinner/Spinner';
import { Icon } from '../../../components/Icons/Icon';
import DrawerMaps from '../../../components/Drawers/DrawerMaps/DrawerMaps';

import { valorantMaps as data } from '../../../global/utils';
import backgroundVideo from '../../../assets/images/valo/background-video.mp4';
import backgroundPoster from '../../../assets/images/valo/background-poster.jpeg';

import styles from './maps.module.scss';

const Maps = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [currentMap, setCurrentMap] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSpinner = () => {
    setIsLoading(false);
  };

  const handleMapChange = (id: number) => {
    if (id === currentMap) return;

    setIsLoading(true);
    setCurrentMap(id);
  };

  const handleViewGallery = () => {
    setOpen(true);
  };

  useEffect(() => {
    document.title = t('pageValoMaps');
    document.documentElement.lang = i18n.language.slice(0, 2);
  }, [t, i18n]);

  return (
    <div className={styles.wrapper}>
      <video autoPlay muted loop poster={backgroundPoster}>
        <source src={backgroundVideo} type='video/mp4' />
      </video>
      <div className={styles.wrapper__content}>
        <div className={styles.title}>
          <span>{t('maps')}</span>
        </div>
        <div key={data[currentMap].name} className={styles.image}>
          {isLoading && (
            <div className={styles.image__spinner}>
              <Spinner />
            </div>
          )}
          <LazyLoad
            width={isLoading ? '0%' : '100%'}
            height={isLoading ? '0%' : '400px'}
            offset={400}
            className={`${styles.image__lazy} ${isLoading ? styles.hidden : ''}`.trim()}
          >
            <img src={data[currentMap].featuredImage} alt={data[currentMap].name} onLoad={handleSpinner} style={{ borderWidth: isLoading ? 0 : 3 }} />
          </LazyLoad>
          <div className={styles.image__info}>
            <span>{data[currentMap].name}</span>
            <span>{t(data[currentMap].description)}</span>
            <span>{currentMap < 9 ? `0${currentMap + 1}` : currentMap + 1}</span>
            <button className={styles.go} onClick={handleViewGallery}>
              <span>{t('viewGallery')}</span>
              <Icon name='ArrowIcon' />
            </button>
          </div>
          <div className={styles.image__actions}>
            {data.map((_el, index) => (
              <button key={index} className={`${currentMap === index ? styles.selected : ''}`} onClick={() => handleMapChange(index)}></button>
            ))}
          </div>
        </div>
      </div>
      <DrawerMaps open={open} onClose={() => setOpen(false)} currentMap={currentMap} />
    </div>
  );
};

export default Maps;
