import { A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from '@mui/material';

import { ButtonGroup } from './components';
import { IImage } from '../../Images/lol/main/ImagesCarousel';

import styles from './carousel-lol-main.module.scss';

interface IProps {
  images: IImage[];
}

const CarouselLolMain = (props: IProps) => {
  const { images } = props;
  const isMobile = useMediaQuery('(max-width: 850px)');

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__carousel}>
        <Swiper
          modules={[Pagination, A11y]}
          slidesPerView={1}
          spaceBetween={0}
          loop
          pagination={{
            type: isMobile ? 'fraction' : 'bullets',
            clickable: true,
            renderBullet: (_index, className) => {
              return `<span class="${className} ${styles.bullets}"></span>`;
            },
            renderFraction(currentClass, totalClass) {
              return `<span class="${currentClass}"></span><span> / </span><span class="${totalClass}"></span>`;
            },
          }}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div key={image.id} className={styles.slide}>
                <img key={image.id} src={image.url} alt={image.name} />
              </div>
            </SwiperSlide>
          ))}
          <ButtonGroup />
        </Swiper>
      </div>
    </div>
  );
};

export default CarouselLolMain;
