import { useState, Dispatch, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { SwipeableDrawer } from '@mui/material';

import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';

import { CardLolChar } from '../../Cards';
import FeaturedTitle from '../../FeaturedTitle/FeaturedTitle';
import Spinner from '../../Spinner/Spinner';

import { useChampionDialog, useFetchData } from '../../../global/utils';
import { IChamp } from '../../../global/interfaces/';

import styles from './drawer-region.module.scss';

interface IProps {
  open: boolean;
  onSetOpen: Dispatch<boolean>;
  region: string;
}

interface ILolRegionDetail {
  data: {
    'associated-champions': IChamp[];
    'champion-list-order': number;
    faction: {
      headerImage: string;
      name: string;
      slug: string;
      video: {
        description: string;
        height: number;
        subtitle: string;
        title: string;
        uri: string;
        width: number;
        x: number;
        y: number;
      };
      overview: { short: string };
    };
    id: string;
    locale: string;
  };
  isFetching: boolean;
  isLoading: boolean;
  refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
}

const DrawerRegion = (props: IProps) => {
  const { open, onSetOpen, region } = props;

  const divRef = useRef<HTMLDivElement>(null);
  const [divOffSetTop, setDivOffSetTop] = useState<number>(0);

  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);

  const handleCloseDrawer = () => {
    onSetOpen(false);
    setIsLoaded(false);
  };

  const handleOpenDrawer = () => {
    onSetOpen(true);
  };

  const { data, isFetching }: ILolRegionDetail = useFetchData('lol-region-detail', region);

  enum REGIONS {
    'bandle-city' = 'bandle_city',
    bilgewater = 'bilgewater',
    demacia = 'demacia',
    freljord = 'freljord',
    'shadow-isles' = 'shadow_isles',
    void = 'void',
    ionia = 'iona',
    ixtal = 'ixtal',
    noxus = 'noxus',
    piltover = 'piltover',
    shurima = 'shurima',
    'mount-targon' = 'mt_targon',
    zaun = 'zaun',
  }

  const { openModal, setOpenModal, championName, setChampionName, DialogLolChampion } = useChampionDialog();

  const handleScroll = () => {
    if (divRef.current && divRef.current?.offsetTop > divOffSetTop) {
      return setScroll(true);
    }

    return setScroll(false);
  };

  useEffect(() => {
    if (divRef.current) {
      setDivOffSetTop(divRef.current?.offsetTop);
    }
  }, [divRef.current?.offsetTop]);

  return (
    <SwipeableDrawer anchor='bottom' open={open} onClose={handleCloseDrawer} onOpen={handleOpenDrawer} className={styles.wrapper}>
      <div className={styles.wrapper__content} onScroll={handleScroll}>
        {!isFetching && (
          <div className={styles.video}>
            {isLoaded && (
              <div className={styles.video__title}>
                <div className={styles['video__title--logo']}>
                  <img
                    src={`https://universe.leagueoflegends.com/images/${REGIONS[data?.faction.slug as keyof typeof REGIONS]}_crest_icon.png`}
                    alt={data?.faction.name}
                  />
                </div>
                <div className={styles['video__title--header']}>
                  <span>{data?.faction.name.toUpperCase()}</span>
                </div>
                <div className={styles['video__title--footer']}>
                  <img src='https://universe.leagueoflegends.com/images/t1HeaderDivider.png' alt='-' />
                </div>
              </div>
            )}
            <video src={data?.faction.video.uri} autoPlay loop preload='auto' onLoadedData={() => setIsLoaded(true)}></video>
          </div>
        )}
        {isLoaded && (
          <>
            <div className={styles['wrapper__content--description']}>
              <span>{data?.faction.overview.short.replace(/<\/?[^>]+(>|$)/g, '')}</span>
            </div>
            <div className={styles['wrapper__content--champions']}>
              <div className={`${styles.title} ${scroll ? styles.sticky : ''}`.trim()} ref={divRef}>
                <FeaturedTitle type='champions' />
              </div>
              <div className={styles.featured}>
                {data['associated-champions'].map((champ) => (
                  <CardLolChar key={champ.name} data={champ} onSetChampionName={setChampionName} onSetOpen={setOpenModal} />
                ))}
              </div>
              <div className={styles.nav}>
                <Link to='/leagueoflegends/champions'>
                  <span>{t('viewChamps')}</span>
                </Link>
              </div>
            </div>
            {openModal && <DialogLolChampion open={openModal} onSetOpen={setOpenModal} championName={championName} />}
          </>
        )}
      </div>
      {!isLoaded && <Spinner color='#ffffff' center />}
    </SwipeableDrawer>
  );
};

export default DrawerRegion;
