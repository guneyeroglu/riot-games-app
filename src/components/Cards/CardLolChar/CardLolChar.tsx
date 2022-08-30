import LazyLoad from 'react-lazy-load';

import styles from './card-lol-char.module.scss';

interface IProps {
  data: {
    blurb: string;
    id: string;
    image: { full: string; group: string; sprite: string };
    key: string;
    name: string;
    partype: string;
    tags: { 0: string; 1: string };
    title: string;
  };
}

const CardLol = (props: IProps) => {
  const { data: champ } = props;

  return (
    <div className={styles.card}>
      <div className={styles.card__item}>
        <LazyLoad
          width={'100%'}
          height={'100%'}
          offset={300}
          className={styles['card__item--hero']}
        >
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`}
            alt={champ.name}
          />
        </LazyLoad>
        <div className={styles['card__item--name']}>
          <span>{champ.name.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default CardLol;
