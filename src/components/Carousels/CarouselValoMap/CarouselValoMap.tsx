import { useState } from 'react';
import { Icon } from '../../Icons/Icon';
import styles from './carousel-valo-map.module.scss';

interface IProps {
  images: string[];
}

const CarouselValoMap = (props: IProps) => {
  const { images } = props;
  const [currentImage, setCurrentImage] = useState<number>(0);

  const handleIncreaseImage = () => setCurrentImage((preValue) => (preValue === images.length - 1 ? 0 : preValue + 1));
  const handleDecreaseImage = () => setCurrentImage((preValue) => (preValue === 0 ? images.length - 1 : preValue - 1));

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__carousel}>
        {images.map((image, idx) => (
          <img key={image + idx} src={image} alt={`${image}-${idx + 1}`} style={{ transform: `translateX(${100 * (idx - currentImage)}%)` }} />
        ))}
      </div>
      <div className={styles.wrapper__actions}>
        <span>{currentImage < 9 ? `0${currentImage + 1}` : currentImage + 1}</span>
        <span>/</span>
        <span>{images.length < 10 ? `0${images.length}` : images.length}</span>
        <button onClick={handleDecreaseImage}>
          <Icon name='ArrowIcon' />
        </button>
        <button onClick={handleIncreaseImage}>
          <Icon name='ArrowIcon' />
        </button>
      </div>
    </div>
  );
};

export default CarouselValoMap;
