import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import useFetchData from '../../../global/hooks/useFetchData';

import { CardLolRegion } from '../../../components/Cards';

import Spinner from '../../../components/Spinner/Spinner';

import backgroundImageRegions from '../../../assets/images/lol/regions-background.png';

import styles from './regions.module.scss';

const Regions = () => {
  const { t, i18n } = useTranslation();

  const { data, isLoading, refetch } = useFetchData('lol-regions');

  useEffect(() => {
    document.title = t('pageLolRegions');
    document.documentElement.lang = i18n.language.slice(0, 2);

    refetch();
  }, [t, i18n, refetch]);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.wrapper__background}
        style={{ backgroundImage: `url(${backgroundImageRegions})` }}
      ></div>
      <div className={styles.wrapper__title}>
        <span>
          {i18n.language === 'tr_TR'
            ? t('regions').toLocaleUpperCase()
            : t('regions').toUpperCase()}
        </span>
      </div>
      <div className={styles.wrapper__content}>
        {isLoading && <Spinner color='#ffffff' />}
        {!isLoading &&
          data?.factions.map((region: any) => (
            <CardLolRegion key={region.name} region={region} />
          ))}
      </div>
    </div>
  );
};

export default Regions;
