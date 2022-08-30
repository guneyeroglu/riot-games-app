import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import FeaturedTitle from '../../../components/FeaturedTitle/FeaturedTitle';

import styles from './lol-main.module.scss';

const LolMain = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('pageLolHome');
    document.documentElement.lang = i18n.language.slice(0, 2);
  }, [t, i18n]);

  return (
    <div className={styles.container}>
      <div className={styles.container__slider}>Araştır.</div>
      <div className={styles.container__featured}>
        <div className={styles.champions}>
          <div className={styles.champions__wrapper}>
            <div className={styles['champions__wrapper--title']}>
              <FeaturedTitle type='champions' />
            </div>
            <div className={styles['champions__wrapper--content']}>
              CARD ITEM
            </div>
            <div className={styles['champions__wrapper--nav']}>
              <Link to='/'>
                <span>Go mo bir şeyler</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.regions}>
          <div className={styles.regions__wrapper}>
            <div className={styles['regions__wrapper--title']}>
              <FeaturedTitle type='regions' />
            </div>
            <div className={styles['regions__wrapper--content']}>
              Dizayn ve düşün
            </div>
            <div className={styles['regions__wrapper--nav']}>
              <Link to='/'>
                <span>Go mo bir şeyler</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container__nav}></div>
    </div>
  );
};

export default LolMain;
