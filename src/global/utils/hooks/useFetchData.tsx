import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { lolApiVersion } from '../../constants';

type url = 'lol-champions' | 'lol-champions-url' | 'lol-champion-detail' | 'lol-regions' | 'lol-region-detail' | 'lol-skins' | 'valo-agents' | 'valo-arsenal';

interface IUrl {
  url: string;
  type: url;
}

const useFetchData = (
  urlAdress: url,
  name?: string,
  options?: {
    enabled?: boolean;
  },
) => {
  const { i18n } = useTranslation();

  const enabled = options ? options.enabled : true;

  const urls: IUrl[] = [
    { type: 'lol-champions', url: `https://universe-meeps.leagueoflegends.com/v1/${i18n.language === 'tr_TR' ? 'tr_tr' : 'en_us'}/champion-browse/index.json` },
    {
      type: 'lol-champions-url',
      url: `https://ddragon.leagueoflegends.com/cdn/${lolApiVersion}/data/${i18n.language === 'tr_TR' ? 'tr_TR' : 'en_US'}/champion.json`,
    },
    {
      type: 'lol-champion-detail',
      url: `https://ddragon.leagueoflegends.com/cdn/${lolApiVersion}/data/${i18n.language === 'tr_TR' ? 'tr_TR' : 'en_US'}/champion/${name}.json`,
    },
    { type: 'lol-regions', url: `https://universe-meeps.leagueoflegends.com/v1/${i18n.language === 'tr_TR' ? 'tr_tr' : 'en_us'}/faction-browse/index.json` },
    {
      type: 'lol-region-detail',
      url: `https://universe-meeps.leagueoflegends.com/v1/${i18n.language === 'tr_TR' ? 'tr_tr' : 'en_us'}/factions/${name}/index.json`,
    },
    { type: 'valo-agents', url: `https://valorant-api.com/v1/agents?language=${i18n.language === 'tr_TR' ? 'tr-TR' : 'en-US'}` },
    { type: 'valo-arsenal', url: `https://valorant-api.com/v1/weapons?language=${i18n.language === 'tr_TR' ? 'tr-TR' : 'en-US'}` },
  ];

  const adress = urls.find((url: IUrl) => url.type === urlAdress);

  const fetchData = async () => await axios.get(adress?.url ?? '').then((res) => res.data);

  const { data, isLoading, refetch, isFetching, isError } = useQuery([urlAdress], fetchData, { refetchOnWindowFocus: false, enabled: enabled, retry: false });

  return { data, isLoading, refetch, isFetching, isError } as const;
};

export default useFetchData;
