import { useSwiper } from 'swiper/react';
import { Icon } from '../../../../Icons/Icon';

import styles from './button-group.module.scss';
import { useEffect, useState } from 'react';

interface IProps {
  currentImage: number;
}
const ButtonGroup = (props: IProps) => {
  const { currentImage } = props;
  const swiper = useSwiper();
  const [maxImageLengt, setMaxImageLength] = useState<number>(0);

  const handleNextImage = () => {
    return swiper.slideNext();
  };

  const handlePrevImage = () => {
    return swiper.slidePrev();
  };

  useEffect(() => {
    setMaxImageLength(swiper.slides.length);
  }, [swiper.slides.length]);

  return (
    <div className={styles.actions}>
      <span>{currentImage < 9 ? `0${currentImage + 1}` : currentImage + 1}</span>
      <span>/</span>
      <span>{maxImageLengt < 10 ? `0${maxImageLengt}` : maxImageLengt}</span>
      <button onClick={handlePrevImage}>
        <Icon name='ArrowIcon' />
      </button>
      <button onClick={handleNextImage}>
        <Icon name='ArrowIcon' />
      </button>
    </div>
  );
};

export default ButtonGroup;
