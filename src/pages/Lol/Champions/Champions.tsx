import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useFetchData from '../../../global/hooks/useFetchData';

import { CardLolChar } from '../../../components/Cards';
import Spinner from '../../../components/Spinner/Spinner';

import championsBackground from '../../../assets/images/lol/champions-background.jpeg';

import styles from './champions.module.scss';

interface IChamp {
  background: {
    title: string;
    uri: string;
    width: number;
    height: number;
    x: number;
    y: number;
  };
  image: {
    title: string;
    uri: string;
    width: number;
    height: number;
    x: number;
    y: number;
  };
  name: string;
  slug: string;
}

const Champions = () => {
  const { t, i18n } = useTranslation();

  const {
    data: championsData,
    isLoading,
    refetch,
  } = useFetchData('lol-champions-regions');

  useEffect(() => {
    document.title = t('pageLolChampions');
    document.documentElement.lang = i18n.language.slice(0, 2);

    refetch();
  }, [t, i18n, refetch]);

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
          championsData?.champions
            .sort((a: IChamp, b: IChamp) => a.name.localeCompare(b.name))
            .map((champ: IChamp) => (
              <CardLolChar data={champ} key={champ.name} />
            ))}
      </div>
    </div>
  );
};

export default Champions;
