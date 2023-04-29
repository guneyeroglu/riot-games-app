import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { ButtonGroup, LinearLabel } from './components';
import { Icon } from '../../Icons/Icon';

import { IArsenalDetails } from '../../../global/interfaces';

import styles from './card-valo-arsenal.module.scss';

interface IProps {
  item: IArsenalDetails;
}

const CardValoArsenal = (props: IProps) => {
  const { item } = props;
  const { t } = useTranslation();
  const [currentSkin, setCurrentSkin] = useState<number>(0);
  const [currentInfo, setCurrentInfo] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const handleSlideChange = (id: number) => {
    setCurrentSkin(id);
  };

  const handleInfoContent = () => {
    setOpen((preValue) => !preValue);
  };

  const skins = item?.skins.filter((image) => !!image.contentTierUuid);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__title}>
        <span>{item?.shopData ? item?.displayName.toLocaleUpperCase('en-US') : t('tacticalKnife')}.</span>
      </div>
      <div className={styles.wrapper__content}>
        <img src={item?.displayIcon} alt={item?.displayName} />
      </div>
      <div className={styles.wrapper__footer}>
        <span>{`// ${item?.shopData ? item?.shopData.categoryText : t('melee')}`}</span>
        <span>{item?.shopData ? `${item.shopData.cost} ${t('credit')}` : t('free')}</span>
      </div>
      <div className={styles.wrapper__skins}>
        <div className={styles['wrapper__skins--title']}>
          <span>{skins?.[currentSkin].displayName}</span>
          {item?.weaponStats && (
            <button onClick={handleInfoContent}>
              <Icon name='InfoIcon' />
            </button>
          )}
        </div>
        <div className={styles['wrapper__skins--content']}>
          <Swiper
            slidesPerView={1}
            spaceBetween={150}
            loop
            onSlideChangeTransitionStart={(swiper) => handleSlideChange(swiper.realIndex)}
            className={styles.swiper}
            lazyPreloadPrevNext={1}
          >
            {skins?.map((image) => (
              <SwiperSlide key={image.uuid} className={styles.slide}>
                <img src={image.levels[0].displayIcon} alt={image.displayName} loading='lazy' />
              </SwiperSlide>
            ))}
            <ButtonGroup />
          </Swiper>
        </div>
      </div>
      {item?.weaponStats && (
        <div className={`${styles.wrapper__info} ${open ? styles.open : ''}`.trim()}>
          <div className={styles['wrapper__info--title']}>
            <span>{item?.displayName}</span>
            <button onClick={handleInfoContent}>
              <Icon name='CloseIcon' />
            </button>
          </div>
          <div className={styles['wrapper__info--content']}>
            <LinearLabel text={t('head')} value={item?.weaponStats.damageRanges[currentInfo].headDamage} />
            <LinearLabel text={t('body')} value={item?.weaponStats.damageRanges[currentInfo].bodyDamage} />
            <LinearLabel text={t('leg')} value={item?.weaponStats.damageRanges[currentInfo].legDamage} />
          </div>
          <div className={styles['wrapper__info--actions']}>
            {item?.weaponStats.damageRanges.map((range, idx) => (
              <button key={uuidv4()} className={idx === currentInfo ? styles.active : ''} onClick={() => setCurrentInfo(idx)}>
                <Icon name='DotIcon' />
              </button>
            ))}
          </div>
          <div className={styles['wrapper__info--others']}>
            <span>
              {`${t('range')} (${item?.weaponStats.damageRanges[currentInfo].rangeStartMeters}m - ${
                item?.weaponStats.damageRanges[currentInfo].rangeEndMeters
              }m)`}
            </span>
            <span>{`${t('magazineSize')} // ${item?.weaponStats.magazineSize}`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardValoArsenal;
