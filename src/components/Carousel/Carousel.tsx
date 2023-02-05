import { useState } from 'react';
import { Icon } from '../Icons/Icon';
import { IImage } from '../Images/lol/main/ImagesCarousel';

import styles from './carousel.module.scss';

interface IProps {
  images: IImage[];
}

const Carousel = (props: IProps) => {
  const { images } = props;

  const [currentImage, setCurrentImage] = useState<number>(0);
  const maxImage = images.length - 1;

  const handleNextImage = () => {
    setCurrentImage(currentImage === maxImage ? 0 : currentImage + 1);
  };

  const handlePrevImage = () => {
    setCurrentImage(currentImage === 0 ? maxImage : currentImage - 1);
  };

  return (
    <div className={styles.wrapper}>
      <div style={{ backgroundImage: `url(${images[currentImage].url})` }} className={styles.wrapper__background}></div>
      <div className={styles.wrapper__carousel}>
        {images.map((image, idx) => (
          <div key={image.id} className={styles.slide} style={{ transform: `translateX(${100 * (idx - currentImage)}%)` }}>
            <img src={image.url} alt={image.name} />
          </div>
        ))}
        <button className={`${styles.button} ${styles.prev}`} onClick={handlePrevImage}>
          <Icon name='ArrowIcon' />
        </button>
        <button className={`${styles.button} ${styles.next}`} onClick={handleNextImage}>
          <Icon name='ArrowIcon' />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
