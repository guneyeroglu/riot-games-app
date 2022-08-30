import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CardLolChar } from '../../../components/Cards';

import championsBackground from '../../../assets/images/lol/champions-background.jpeg';

import styles from './champions.module.scss';
import useFetchData from '../../../global/hooks/useFetchData';

const Champions = () => {
  const { t, i18n } = useTranslation();

  const { data } = useFetchData('lol-champions');

  useEffect(() => {
    document.title = t('pageLolChampions');
    document.documentElement.lang = i18n.language.slice(0, 2);
  }, [t, i18n]);

  return (
    <div className={styles.container}>
      <div
        className={styles.container__background}
        style={{
          backgroundImage: `url(${championsBackground})`,
        }}
      ></div>
      <div className={styles.container__filter}></div>
      <div className={styles.container__content}>
        {data?.data &&
          Object.keys(data?.data).map((champName: string) => (
            <CardLolChar data={data?.data[champName]} key={champName} />
          ))}
      </div>
    </div>
  );
};

export default Champions;
