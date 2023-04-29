import { useTranslation } from 'react-i18next';

import { Icon } from '../../components/Icons/Icon';
import background from '../../assets/images/global/404.jpg';

import styles from './not-found.module.scss';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__background} style={{ backgroundImage: `url(${background})` }}></div>
      <div className={styles.wrapper__content}>
        <h3>404</h3>
        <div className={styles['wrapper__content--message']}>
          <span>{t('notFound')}</span>
        </div>
        <div className={styles['wrapper__content--navigate']}>
          <a href='/'>
            <span>{t('returnToUniverse')}</span>
            <Icon name='ArrowIcon' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
