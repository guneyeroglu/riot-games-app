import { useTranslation } from 'react-i18next';

import styles from './featured-title.module.scss';

import { typesLol } from '../../global/types/TypesLol';

interface IProps {
  type: typesLol;
}

interface IContent {
  name: typesLol;
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
    {
      name: 'items',
      link: 'https://universe.leagueoflegends.com/esimages/content_type_icon_trending__2Bld0.png',
      translation: 'items',
    },
    {
      name: 'ranks',
      link: 'https://universe.leagueoflegends.com/esimages/content_type_icon_latest__1ulWu.png',
      translation: 'ranks',
    },
  ];

  enum FEATURED_TYPES {
    champions = 0,
    regions = 1,
    items = 2,
    ranks = 3,
  }

  const content = contents[FEATURED_TYPES[props.type]];

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__logo}>
        <img src={content.link} alt={content.name} />
      </div>
      <div className={styles.wrapper__title}>
        <span>
          <img
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARcAAAABCAYAAAD0K+rmAAAA80lEQVR4AV2TiW0EMQwDh72loqSTFGwF8A0Exnu/xW/pc35/vr5DmBlIBvyRwP3I3BnctfC5XAMy5LOQC8ZBcZO7UNwBQUQr/cUHNNVMDYaLxhHwZpvmiJqE9l3pJOKfmYQX2zmTUPerj5jtBRKVBBl0dNjf97Hft99jl29vynHucPUGzN55txnS3U3XHHH/feh96WzH5CcJi1c0Jf70OJj3s65mwfXzc/s527ncxnbWaNkz+6p9XE5zJYoB7HQ3IHbQRa/2q9P59Nl7qrfmbzf9HwI0Kq6Dx9f55hS0fejkedg+BSjs+XvP5NM/67k4ATr/AU/oIFuGMAGgAAAAAElFTkSuQmCC'
            alt='-'
          />
        </span>
        <span>{t(content.translation)}</span>
        <span>
          <img
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARcAAAABCAYAAAD0K+rmAAAA80lEQVR4AV2TiW0EMQwDh72loqSTFGwF8A0Exnu/xW/pc35/vr5DmBlIBvyRwP3I3BnctfC5XAMy5LOQC8ZBcZO7UNwBQUQr/cUHNNVMDYaLxhHwZpvmiJqE9l3pJOKfmYQX2zmTUPerj5jtBRKVBBl0dNjf97Hft99jl29vynHucPUGzN55txnS3U3XHHH/feh96WzH5CcJi1c0Jf70OJj3s65mwfXzc/s527ncxnbWaNkz+6p9XE5zJYoB7HQ3IHbQRa/2q9P59Nl7qrfmbzf9HwI0Kq6Dx9f55hS0fejkedg+BSjs+XvP5NM/67k4ATr/AU/oIFuGMAGgAAAAAElFTkSuQmCC'
            alt='-'
          />
        </span>
      </div>
    </div>
  );
};

export default FeaturedTitle;
