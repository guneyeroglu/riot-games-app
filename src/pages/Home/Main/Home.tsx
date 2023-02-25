import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import Divider from '../../../components/Divider/Divider';
import heroPhoto from '../../../assets/images/home/riot-games-home-logo.jpeg';
import valoPhoto from '../../../assets/images/home/valo-card.jpg';
import lolPhoto from '../../../assets/images/home/lol-card.jpg';

import styles from './home.module.scss';

interface IGames {
  id: number;
  name: string;
  to: string;
  photo: string;
}

const Home = () => {
  const { t, i18n } = useTranslation();

  const gameList: IGames[] = [
    {
      id: 1,
      name: 'League of Legends',
      to: '/leagueoflegends',
      photo: lolPhoto,
    },
    {
      id: 2,
      name: 'Valorant',
      to: '/valorant',
      photo: valoPhoto,
    },
  ];

  useEffect(() => {
    document.title = t('pageRiotHome');
    document.documentElement.lang = i18n.language.slice(0, 2);
  }, [t, i18n]);

  return (
    <div className={styles.container}>
      <div className={styles.container__hero}>
        <div className={styles['container__hero--images']}>
          <img src={heroPhoto} alt='hero' />
        </div>
      </div>
      <div className={styles.container__nav}>
        <div className={styles['container__nav--title']}>
          <span>{t('gameList')}</span>
        </div>
        <div className={styles.games}>
          <div className={styles.games__card}>
            <ul>
              {gameList.map((game: IGames) => (
                <li key={game.id}>
                  <Link to={game.to}>
                    <img src={game.photo} alt={game.name} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.container__divider}>
        <Divider />
      </div>
    </div>
  );
};

export default Home;
