import agent from '../../../assets/images/valo/fade.jpg';

import { useTranslation } from 'react-i18next';

import styles from './valorant-main.module.scss';
import ValoList from '../../../components/ValoList/ValoList';
import { useEffect } from 'react';

const ValoMain = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('pageValoHome');
  }, [t]);

  return (
    <div className={styles.container}>
      <div className={styles.container__image}>
        <img src={agent} alt='agent-img' />
        <div className={styles.title}>
          <div className={styles.title__one}>
            <span>{t('valoTextOne')}</span>
            <span>VALORANT.</span>
          </div>
          <div className={styles.title__two}>
            <span>{t('valoTextTwo')}</span>
            <span>{t('valoTextThree')}</span>
          </div>
        </div>
      </div>
      <div className={styles.container__content}>
        <ValoList />
      </div>
    </div>
  );
};

export default ValoMain;
