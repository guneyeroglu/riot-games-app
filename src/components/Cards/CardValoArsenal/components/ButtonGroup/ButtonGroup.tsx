import { useSwiper } from 'swiper/react';
import { Icon } from '../../../../Icons/Icon';

import styles from './button-group.module.scss';

interface IProps {
  maxLength: number;
}

const ButtonGroup = (props: IProps) => {
  const { maxLength } = props;
  const swiper = useSwiper();

  const handleNextSkin = () => {
    swiper.slideNext();
  };

  const handlePrevSkin = () => {
    swiper.slidePrev();
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={handlePrevSkin} disabled={swiper.realIndex === 0}>
        <Icon name='ArrowIcon' />
      </button>
      <button onClick={handleNextSkin} disabled={swiper.realIndex === maxLength - 1}>
        <Icon name='ArrowIcon' />
      </button>
    </div>
  );
};

export default ButtonGroup;
