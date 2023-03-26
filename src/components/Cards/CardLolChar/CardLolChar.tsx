import { Dispatch } from 'react';
import LazyLoad from 'react-lazy-load';

import { useFetchData } from '../../../global/utils';
import { IChamp } from '../../../global/interfaces';

import styles from './card-lol-char.module.scss';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router';

interface IProps {
  data: IChamp;
  onSetChampionName: Dispatch<string>;
  onSetOpen: Dispatch<boolean>;
}

const CardLol = (props: IProps) => {
  const { data: champ, onSetChampionName: setChampionName, onSetOpen } = props;
  const { data: champUrl } = useFetchData('lol-champions-url');
  const navigate = useNavigate();
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const handleChampionName = (name: string) => {
    if (isTablet) return navigate(`/leagueoflegends/champions/${name}}`);

    const charName = Object.keys(champUrl?.data).find(
      (char: string) =>
        champUrl?.data[char]?.name.replace("'", '').replace('`', '').replace('’', '').toLowerCase() ===
        name.replace("'", '').replace('`', '').replace('’', '').toLowerCase(),
    );

    setChampionName(charName || '');

    onSetOpen(true);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__item} onClick={() => handleChampionName(champ.name)}>
        <LazyLoad width={'100%'} height={425} offset={400} className={styles['card__item--hero']}>
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${champ.background.uri})`,
              backgroundPosition: `${100 * (champ.background.x / champ.background.width)}%`,
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
