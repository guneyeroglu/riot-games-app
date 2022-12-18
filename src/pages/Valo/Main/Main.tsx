import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import ValoList from '../../../components/ValoList/ValoList';

import agent from '../../../assets/images/valo/fade.jpg';

import styles from './main.module.scss';

const Main = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('pageValoHome');
    document.documentElement.lang = i18n.language.slice(0, 2);
  }, [t, i18n]);

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

export default Main;
