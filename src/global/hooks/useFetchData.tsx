import { useTranslation } from 'react-i18next';

import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

type url =
  | 'lol-champions-regions'
  | 'lol-skins'
  | 'lol-items'
  | 'lol-ranks'
  | 'valo-agents'
  | 'valo-maps'
  | 'valo-arsenal'
  | 'valo-ranks';

interface IUrl {
  url: string;
  type: url;
}

const useFetchData = (urlAdress: url, champName?: string) => {
  const { i18n } = useTranslation();

  const urls: IUrl[] = [
    {
      type: 'lol-champions-regions',
      url: `https://universe-meeps.leagueoflegends.com/v1/${
        i18n.language === 'tr_TR' ? 'tr_tr' : 'en_us'
      }/search/index.json`,
    },
    {
      type: 'lol-skins',
      url: `https://www.leagueoflegends.com/page-data/${
        i18n.language === 'tr_TR' ? 'tr-tr' : 'en-us'
      }/champions/${champName}/page-data.json`,
    },
    {
      type: 'lol-items',
      url: ``,
    },

    { type: 'lol-ranks', url: `` },

    { type: 'valo-agents', url: `` },
    { type: 'valo-maps', url: `` },
    { type: 'valo-arsenal', url: `` },
    { type: 'valo-ranks', url: `` },
  ];

  const adress = urls.find((url: IUrl) => url.type === urlAdress);

  const fetchData = async () => {
    return await axios.get(adress?.url ?? '').then((res) => res.data);
  };

  const { data, isLoading, refetch } = useQuery([urlAdress], fetchData);

  return { data, isLoading, refetch };
};

export default useFetchData;
