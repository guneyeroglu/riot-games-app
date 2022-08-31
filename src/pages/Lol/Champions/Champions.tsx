import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useFetchData from '../../../global/hooks/useFetchData';

import { CardLolChar } from '../../../components/Cards';

import championsBackground from '../../../assets/images/lol/champions-background.jpeg';

import styles from './champions.module.scss';
import Spinner from '../../../components/Spinner/Spinner';

const Champions = () => {
  const { t, i18n } = useTranslation();

  const {
    data: championsData,
    isLoading,
    refetch,
  } = useFetchData('lol-champions');

  useEffect(() => {
    document.title = t('pageLolChampions');
    document.documentElement.lang = i18n.language.slice(0, 2);

    refetch();
  }, [t, i18n, refetch]);

  console.log(isLoading);

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
        {isLoading && <Spinner />}
        {!isLoading &&
          Object.keys(championsData?.data).map((champName: string) => (
            <CardLolChar
              data={championsData?.data[champName]}
              key={champName}
            />
          ))}
      </div>
    </div>
  );
};

export default Champions;
