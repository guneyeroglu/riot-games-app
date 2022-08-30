import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import axios from 'axios';

type url =
  | 'lol-champions'
  | 'lol-regions'
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

const useFetchData = (urlAdress: url) => {
  const { i18n } = useTranslation();

  const urls: IUrl[] = [
    {
      type: 'lol-champions',
      url: `https://ddragon.leagueoflegends.com/cdn/12.8.1/data/${i18n.language}/champion.json`,
    },
    { type: 'lol-items', url: '' },
    { type: 'lol-ranks', url: '' },
    { type: 'lol-regions', url: '' },
    { type: 'lol-regions', url: '' },
    { type: 'lol-regions', url: '' },
    { type: 'lol-regions', url: '' },
    { type: 'lol-regions', url: '' },
  ];

  const [data, setData] = useState<any>([]);

  const adress = urls.find((url: IUrl) => url.type === urlAdress);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(adress?.url ?? '');
      setData(response.data);
    };
    fetchData();
  }, [adress?.url]);

  return { data, setData };
};

export default useFetchData;
