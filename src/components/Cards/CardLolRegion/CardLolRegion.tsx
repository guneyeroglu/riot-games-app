import styles from './card-lol-region.module.scss';

interface IProps {
  region: {
    description: string;
    image: {
      title: string;
      subtitle: string;
      description: string;
      uri: string;
      width: number;
      height: number;
      x: number;
      y: number;
    };
    name: string;
    slug: string;
  };
}

enum REGIONS {
  'bandle-city' = 'bandle_city',
  bilgewater = 'bilgewater',
  demacia = 'demacia',
  freljord = 'freljord',
  'shadow-isles' = 'shadow_isles',
  void = 'void',
  ionia = 'iona',
  ixtal = 'ixtal',
  noxus = 'noxus',
  piltover = 'piltover',
  shurima = 'shurima',
  'mount-targon' = 'mt_targon',
  zaun = 'zaun',
}

const CardLolRegion = (props: IProps) => {
  const { region } = props;

  return (
    <div className={styles.card}>
      <div
        className={styles.card__background}
        style={{ backgroundImage: `url(${region.image.uri})` }}
      ></div>
      <div className={styles.card__name}>
        <span>{region.name.toUpperCase()}</span>
      </div>
      <img
        src={`https://universe.leagueoflegends.com/images/${
          REGIONS[region.slug as keyof typeof REGIONS]
        }_crest_icon.png`}
        alt={region.name}
      />
    </div>
  );
};

export default CardLolRegion;
