import { useState, Dispatch } from 'react';

import { SwipeableDrawer } from '@mui/material';

import { useFetchData } from '../../../global/utils';

import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from '@tanstack/react-query';

import Spinner from '../../Spinner/Spinner';

import styles from './drawer-region.module.scss';

interface IProps {
  open: boolean;
  onSetOpen: Dispatch<boolean>;
  region: string;
}

interface ILolRegionDetail {
  data: {
    'associated-champions': {
      'associated-faction': string;
      'associated-faction-slug': string;
      background: {
        description: string;
        encoding: string;
        'featured-champions': any;
        height: number;
        subtitle: string;
        title: string;
        uri: string;
        width: number;
        x: number;
        y: number;
      };
      biography: { short: string };
      name: string;
      'section-title': string;
      slug: string;
      subtitle: string;
      title: string;
      url: string;
    }[];
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
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

const DrawerRegion = (props: IProps) => {
  const { open, onSetOpen, region } = props;

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleCloseDrawer = () => {
    onSetOpen(false);
    setIsLoaded(false);
  };

  const handleOpenDrawer = () => {
    onSetOpen(true);
  };

  const { data, isFetching }: ILolRegionDetail = useFetchData(
    'lol-region-detail',
    region
  );

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

  return (
    <SwipeableDrawer
      anchor='bottom'
      open={open}
      onClose={handleCloseDrawer}
      onOpen={handleOpenDrawer}
      className={styles.wrapper}
    >
      <div className={styles.wrapper__content}>
        {!isFetching && (
          <div className={styles.video}>
            {isLoaded && (
              <div className={styles.video__title}>
                <div className={styles['video__title--logo']}>
                  <img
                    src={`https://universe.leagueoflegends.com/images/${
                      REGIONS[data?.faction.slug as keyof typeof REGIONS]
                    }_crest_icon.png`}
                    alt={data?.faction.name}
                  />
                </div>
                <div className={styles['video__title--header']}>
                  <span>{data?.faction.name.toUpperCase()}</span>
                </div>
                <div className={styles['video__title--footer']}>
                  <img
                    src='https://universe.leagueoflegends.com/images/t1HeaderDivider.png'
                    alt='-'
                  />
                </div>
              </div>
            )}
            <video
              src={data?.faction.video.uri}
              autoPlay
              loop
              preload='auto'
              onLoadedData={() => setIsLoaded(true)}
            ></video>
          </div>
        )}
        {isLoaded && (
          <>
            <div className={styles['wrapper__content--description']}>
              <span>
                {data?.faction.overview.short.replace(/<\/?[^>]+(>|$)/g, '')}
              </span>
            </div>
            <div className={styles['wrapper__content--featured']}></div>
          </>
        )}
      </div>
      {!isLoaded && <Spinner color='#ffffff' center />}
    </SwipeableDrawer>
  );
};

export default DrawerRegion;
