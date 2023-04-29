import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination } from 'swiper';

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
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleSpinner = () => {
    setIsLoading(false);
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
        <div className={styles.images}>
          <Swiper
            modules={[Pagination, A11y]}
            slidesPerView={1}
            spaceBetween={50}
            className={styles.images__swiper}
            loop
            grabCursor
            onSlideChangeTransitionStart={(swiper) => setCurrentMap(swiper.realIndex)}
            pagination={{
              type: 'bullets',
              clickable: true,
              renderBullet: (_index, className) => {
                return `<span class="${className} ${styles.actions}"><button></button></span>`;
              },
            }}
          >
            {data.map((map) => (
              <SwiperSlide key={map.name}>
                <div key={map.name} className={styles['images__swiper--item']}>
                  {isLoading && (
                    <div key={map.description} className={styles.spinner} style={{ height: isMobile ? '275px' : '450px' }}>
                      <Spinner />
                    </div>
                  )}
                  <img
                    key={map.name}
                    src={map.featuredImage}
                    alt={map.name}
                    onLoad={handleSpinner}
                    style={{ borderWidth: isLoading ? 0 : 3 }}
                    width={isLoading ? '0%' : '100%'}
                    height={isLoading ? '0%' : `${isMobile ? '275px' : '450px'}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div key={data[currentMap].name} className={styles['images__swiper--info']}>
            <span>{data[currentMap].name}</span>
            <span>{t(data[currentMap].description)}</span>
            <span>{currentMap < 9 ? `0${currentMap + 1}` : currentMap + 1}</span>
            <button className={styles.go} onClick={handleViewGallery}>
              <span>{t('viewGallery')}</span>
              <Icon name='ArrowIcon' />
            </button>
          </div>
        </div>
      </div>
      <DrawerMaps open={open} onClose={() => setOpen(false)} currentMap={currentMap} />
    </div>
  );
};

export default Maps;
