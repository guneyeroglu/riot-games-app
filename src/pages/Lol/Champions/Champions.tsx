import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import axios from 'axios';

import { CardLolChar } from '../../../components/Cards';

import championsBackground from '../../../assets/images/lol/champions-background.jpeg';
import styles from './champions.module.scss';

const Champions = () => {
  const { t, i18n } = useTranslation();
  const [champData, setChampData] = useState<any>([]);

  useEffect(() => {
    document.title = t('pageLolChampions');
    document.documentElement.lang = i18n.language.slice(0, 2);

    const fetchLolData = async () => {
      const response = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/12.8.1/data/${i18n.language}/champion.json`
      );

      console.log('hey');

      setChampData(response.data.data);
    };

    fetchLolData();
  }, [t, i18n]);

  return (
    <div className={styles.container}>
      <div
        className={styles.container__background}
        style={{
          backgroundImage: `url(${championsBackground})`,
        }}
      ></div>
      <div className={styles.container__filter}></div>
      <div className={styles.container__content}>
        {Object.keys(champData).map((champName: string) => (
          <CardLolChar data={champData[champName]} key={champName} />
        ))}
      </div>
    </div>
  );
};

export default Champions;
