import { useSwiper } from 'swiper/react';
import { Icon } from '../../../../Icons/Icon';

import styles from './button-group.module.scss';

const ButtonGroup = () => {
  const swiper = useSwiper();

  const handleNextSkin = () => {
    swiper.slideNext();
  };

  const handlePrevSkin = () => {
    swiper.slidePrev();
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={handlePrevSkin}>
        <Icon name='ArrowIcon' />
      </button>
      <button onClick={handleNextSkin}>
        <Icon name='ArrowIcon' />
      </button>
    </div>
  );
};

export default ButtonGroup;
