import { Dispatch } from 'react';

import { SwipeableDrawer } from '@mui/material';

import useFetchData from '../../../global/hooks/useFetchData';

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

  const handleCloseDrawer = () => {
    onSetOpen(false);
  };

  const handleOpenDrawer = () => {
    onSetOpen(true);
  };

  const { data, isFetching, isLoading, refetch }: ILolRegionDetail =
    useFetchData('lol-region-detail', region);

  console.log(data);

  return (
    <SwipeableDrawer
      anchor='bottom'
      open={open}
      onClose={handleCloseDrawer}
      onOpen={handleOpenDrawer}
      className={styles.wrapper}
    >
      <div className={styles.wrapper__title}>
        {!isFetching && <span>{data?.faction.name.toUpperCase()}</span>}
        {isFetching && <Spinner />}
      </div>
      <div className={styles.wrapper__content}>
        {!isFetching && (
          <video
            src={data?.faction.video.uri}
            autoPlay
            loop
            preload='auto'
          ></video>
        )}
        {isFetching && <Spinner color='#111111' center />}
        <span>{data.faction.name}</span>
      </div>
    </SwipeableDrawer>
  );
};

export default DrawerRegion;
