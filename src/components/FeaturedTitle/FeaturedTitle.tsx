import { useTranslation } from 'react-i18next';
import styles from './featured-title.module.scss';

type types = 'champions' | 'regions';

interface IProps {
  type: types;
}

interface IContent {
  name: types;
  link: string;
  translation: string;
}

const FeaturedTitle = (props: IProps) => {
  const { t } = useTranslation();
  const contents: IContent[] = [
    {
      name: 'champions',
      link: 'https://universe.leagueoflegends.com/esimages/content_type_icon_champion__3nwJQ.png',
      translation: 'featuredChamps',
    },
    {
      name: 'regions',
      link: 'https://universe.leagueoflegends.com/esimages/content_type_icon_faction__14mjH.png',
      translation: 'featuredRegions',
    },
  ];

  enum FEATURED_TYPES {
    champions = 0,
    regions = 1,
  }

  const content = contents[FEATURED_TYPES[props.type]];

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__logo}>
        <img src={content.link} alt={content.name} />
      </div>
      <div className={styles.wrapper__title}>
        <img
          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARcAAAABCAYAAAD0K+rmAAAA80lEQVR4AV2TiW0EMQwDh72loqSTFGwF8A0Exnu/xW/pc35/vr5DmBlIBvyRwP3I3BnctfC5XAMy5LOQC8ZBcZO7UNwBQUQr/cUHNNVMDYaLxhHwZpvmiJqE9l3pJOKfmYQX2zmTUPerj5jtBRKVBBl0dNjf97Hft99jl29vynHucPUGzN55txnS3U3XHHH/feh96WzH5CcJi1c0Jf70OJj3s65mwfXzc/s527ncxnbWaNkz+6p9XE5zJYoB7HQ3IHbQRa/2q9P59Nl7qrfmbzf9HwI0Kq6Dx9f55hS0fejkedg+BSjs+XvP5NM/67k4ATr/AU/oIFuGMAGgAAAAAElFTkSuQmCC'
          alt='-'
        />
        <span>{t(content.translation)}</span>
        <img
          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARcAAAABCAYAAAD0K+rmAAAA80lEQVR4AV2TiW0EMQwDh72loqSTFGwF8A0Exnu/xW/pc35/vr5DmBlIBvyRwP3I3BnctfC5XAMy5LOQC8ZBcZO7UNwBQUQr/cUHNNVMDYaLxhHwZpvmiJqE9l3pJOKfmYQX2zmTUPerj5jtBRKVBBl0dNjf97Hft99jl29vynHucPUGzN55txnS3U3XHHH/feh96WzH5CcJi1c0Jf70OJj3s65mwfXzc/s527ncxnbWaNkz+6p9XE5zJYoB7HQ3IHbQRa/2q9P59Nl7qrfmbzf9HwI0Kq6Dx9f55hS0fejkedg+BSjs+XvP5NM/67k4ATr/AU/oIFuGMAGgAAAAAElFTkSuQmCC'
          alt='-'
        />
      </div>
    </div>
  );
};

export default FeaturedTitle;
