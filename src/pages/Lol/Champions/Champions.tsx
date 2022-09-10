import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useFetchData from '../../../global/hooks/useFetchData';
import useSortOrder from '../../../global/hooks/useSortOrder';

import { CardLolChar } from '../../../components/Cards';
import Spinner from '../../../components/Spinner/Spinner';
import FeaturedTitle from '../../../components/FeaturedTitle/FeaturedTitle';
import SearchBar from '../../../components/Search/SearchBar';
import Sort from '../../../components/Sort/Sort';

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

  const [inputValue, setInputValue] = useState<string>('');

  const {
    data: championsData,
    isLoading,
    refetch,
  } = useFetchData('lol-champions');

  const { sortType, setSortType, handleSortOrder } = useSortOrder(
    'a-z',
    'name'
  );

  useEffect(() => {
    document.title = t('pageLolChampions');
    document.documentElement.lang = i18n.language.slice(0, 2);

    refetch();
  }, [t, i18n, refetch]);

  const filteredData =
    !isLoading &&
    championsData.champions.filter((champ: IChamp) =>
      champ.name.toUpperCase().includes(inputValue.toUpperCase())
    );

  return (
    <div className={styles.container}>
      <div
        className={styles.container__background}
        style={{
          backgroundImage: `url(${championsBackground})`,
        }}
      ></div>
      <div className={styles.container__filter}>
        <div className={styles.box}>
          <SearchBar
            inputValue={inputValue}
            onSetInputValue={setInputValue}
            find='champion'
          />
          <Sort type={sortType} onSetType={setSortType} />
        </div>
      </div>
      <div className={styles.container__title}>
        <FeaturedTitle type='champions' translation='champions' />
      </div>
      <div className={styles.container__content}>
        {isLoading && <Spinner />}
        {filteredData && filteredData.length === 0 && (
          <div className={styles['not-found']}>
            <span>{t('notFoundChampions')}</span>
          </div>
        )}
        {filteredData &&
          filteredData
            .sort(handleSortOrder)
            .map((champ: IChamp) => (
              <CardLolChar data={champ} key={champ.name} />
            ))}
      </div>
    </div>
  );
};

export default Champions;
