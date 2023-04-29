import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination } from 'swiper';

import { ButtonGroup } from './components';

import styles from './carousel-valo-map.module.scss';

interface IProps {
  data: { description: string; featuredImage: string; featuredImageMobile: string; images: string[]; name: string };
}

const CarouselValoMap = (props: IProps) => {
  const { data } = props;

  const [currentImage, setCurrentImage] = useState<number>(0);

  const buttonProps = { currentImage };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__carousel}>
        <Swiper
          className={styles.swiper}
          modules={[Pagination, A11y]}
          slidesPerView={1}
          spaceBetween={50}
          loop
          grabCursor
          onSlideChangeTransitionStart={(swiper) => setCurrentImage(swiper.realIndex)}
        >
          {data.images.map((image, idx) => (
            <SwiperSlide key={image + idx}>
              <img src={image} alt={`${data.name} - ${idx + 1}`} />
            </SwiperSlide>
          ))}
          <ButtonGroup {...buttonProps} />
        </Swiper>
      </div>
    </div>
  );
};

export default CarouselValoMap;
