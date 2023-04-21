import { useSwiper } from 'swiper/react';
import { Icon } from '../../../../Icons/Icon';

import styles from './button-group.module.scss';

const ButtonGroup = () => {
  const swiper = useSwiper();

  const handleNextImage = () => {
    return swiper.slideNext();
  };

  const handlePrevImage = () => {
    return swiper.slidePrev();
  };

  return (
    <>
      <button className={`${styles.button} ${styles.prev}`.trim()} onClick={handlePrevImage}>
        <Icon name='ArrowIcon' />
      </button>
      <button className={`${styles.button} ${styles.next}`.trim()} onClick={handleNextImage}>
        <Icon name='ArrowIcon' />
      </button>
    </>
  );
};

export default ButtonGroup;
