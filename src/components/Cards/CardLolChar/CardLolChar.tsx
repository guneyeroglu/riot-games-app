import { Dispatch } from 'react';
import useFetchData from '../../../global/hooks/useFetchData';

import LazyLoad from 'react-lazy-load';

import styles from './card-lol-char.module.scss';

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

interface IProps {
  data: IChamp;
  onSetChampionName: Dispatch<string>;
  onSetOpen: Dispatch<boolean>;
}

const CardLol = (props: IProps) => {
  const { data: champ, onSetChampionName: setChampionName, onSetOpen } = props;

  const { data: champUrl } = useFetchData('lol-champions-url');

  const handleChampionName = (name: string) => {
    const charName = Object.keys(champUrl?.data).find((char: string) =>
      name.toLowerCase().includes(char.toLowerCase())
    );

    console.log(champUrl?.data);

    setChampionName(charName || '');

    onSetOpen(true);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.card__item}
        onClick={() => handleChampionName(champ.slug)}
      >
        <LazyLoad
          width={'100%'}
          height={425}
          offset={400}
          className={styles['card__item--hero']}
        >
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${champ.background.uri})`,
              backgroundPosition: `${
                100 * (champ.background.x / champ.background.width)
              }%`,
            }}
          ></div>
        </LazyLoad>
        <div className={styles['card__item--name']}>
          <span>{champ.name.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default CardLol;
