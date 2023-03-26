import { useTranslation } from 'react-i18next';
import { Drawer } from '@mui/material';

import { CarouselValoMap } from '../../Carousels';
import { Icon } from '../../Icons/Icon';
import { valorantMaps as data } from '../../../global/utils';

import styles from './drawer-maps.module.scss';

interface IProps {
  open: boolean;
  onClose: () => any;
  currentMap: number;
}

const DrawerMaps = (props: IProps) => {
  const { open, onClose, currentMap } = props;
  const { t } = useTranslation();

  return (
    <Drawer open={open} anchor='left' className={styles.drawer} onClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__title}>
          <span>{data[currentMap].name}</span>
          <button onClick={onClose}>
            <Icon name='CloseIcon' />
          </button>
        </div>
        <div className={styles.wrapper__content}>
          <div className={styles.description}>
            <span>{data[currentMap].name}</span>
            <span>{t(data[currentMap].description)}</span>
          </div>
          <div className={styles.images}>
            <CarouselValoMap images={data[currentMap].images} />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerMaps;
