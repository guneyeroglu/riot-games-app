import { Dispatch } from 'react';

import { SwipeableDrawer } from '@mui/material';

import styles from './drawer-region.module.scss';
import useFetchData from '../../../global/hooks/useFetchData';

interface IProps {
  open: boolean;
  onSetOpen: Dispatch<boolean>;
  region: string;
}

const DrawerRegion = (props: IProps) => {
  const { open, onSetOpen, region } = props;

  const handleCloseDrawer = () => {
    onSetOpen(false);
  };

  const handleOpenDrawer = () => {
    onSetOpen(true);
  };

  const { data, isFetching, isLoading, refetch } = useFetchData(
    'lol-region-detail',
    region
  );

  return (
    <SwipeableDrawer
      anchor='bottom'
      open={open}
      onClose={handleCloseDrawer}
      onOpen={handleOpenDrawer}
      className={styles.wrapper}
    >
      <div className={styles.wrapper__title}>
        <span>Peki</span>
      </div>
      <div className={styles.wrapper__content}>
        <div className={styles['wrapper__content--bg']}></div>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          ullam veniam consequatur totam tempore sit est maxime laboriosam et
          sint, atque consequuntur officia ducimus aperiam!
        </span>
      </div>
    </SwipeableDrawer>
  );
};

export default DrawerRegion;
