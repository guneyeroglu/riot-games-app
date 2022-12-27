import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DrawerRegion from '../../../components/Drawers/DrawerRegion/DrawerRegion';
import Spinner from '../../../components/Spinner/Spinner';
import { CardLolRegion } from '../../../components/Cards';

import backgroundImageRegions from '../../../assets/images/lol/regions-background.png';

import { useFetchData } from '../../../global/utils';
import { IRegion } from '../../../global/interfaces';

import styles from './regions.module.scss';

const Regions = () => {
  const { t, i18n } = useTranslation();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [regionName, setRegionName] = useState<string>('');

  const { data, isLoading, refetch } = useFetchData('lol-regions');

  useEffect(() => {
    document.title = t('pageLolRegions');
    document.documentElement.lang = i18n.language.slice(0, 2);

    refetch();
  }, [t, i18n, refetch]);

  const handleDrawer = (name: string) => {
    setOpenDrawer((preValue) => !preValue);
    setRegionName(name);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__background} style={{ backgroundImage: `url(${backgroundImageRegions})` }}></div>
      <div className={styles.wrapper__title}>
        <span>{i18n.language === 'tr_TR' ? t('regions').toLocaleUpperCase() : t('regions').toUpperCase()}</span>
      </div>
      <div className={styles.wrapper__content}>
        {isLoading && <Spinner color='#ffffff' />}
        {!isLoading && data?.factions.map((region: IRegion) => <CardLolRegion key={region.name} region={region} onSetDrawer={handleDrawer} />)}
      </div>
      {openDrawer && <DrawerRegion open={openDrawer} onSetOpen={setOpenDrawer} region={regionName} />}
    </div>
  );
};

export default Regions;
