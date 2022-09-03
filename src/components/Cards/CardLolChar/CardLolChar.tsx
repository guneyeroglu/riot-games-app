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
}

const CardLol = (props: IProps) => {
  const { data: champ } = props;

  return (
    <div className={styles.card}>
      <div className={styles.card__item}>
        <LazyLoad
          width={'100%'}
          height={425}
          offset={400}
          className={styles['card__item--hero']}
        >
          <div
            style={{
              backgroundImage: `url(${champ.background.uri})`,
              backgroundPosition: `${
                100 * (champ.background.x / champ.background.width)
              }%`,
            }}
            className={styles.image}
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
