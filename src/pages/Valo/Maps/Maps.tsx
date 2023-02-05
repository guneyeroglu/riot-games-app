import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from '../../../components/Carousel/Carousel';

import { valorantMaps as data } from '../../../global/utils';

import styles from './maps.module.scss';

const Maps = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('pageValoMaps');
    document.documentElement.lang = i18n.language.slice(0, 2);
  }, [t, i18n]);

  return (
    <div className={styles.wrapper}>
      <Carousel
        images={data.map((map, idx) => {
          const obj = {
            id: idx,
            name: map.name,
            url: map.featuredImage,
          };

          return obj;
        })}
      />
    </div>
  );
};

export default Maps;
