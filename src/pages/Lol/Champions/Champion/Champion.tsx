import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useFetchData } from '../../../../global/utils';

import { IChampionDetails } from '../../../../global/interfaces';

import styles from './champion.module.scss';

const Champion = () => {
  const { championName } = useParams();
  const navigate = useNavigate();

  const { data, isFetching, refetch, isLoading, isError } = useFetchData('lol-champion-detail', championName, { enabled: true });
  const championDetails: IChampionDetails = data?.data?.[championName || ''];

  useEffect(() => {
    if (isError) {
      navigate('/leagueoflegends/champions');
    }
  }, [isError, navigate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__content}>
        <div
          className={styles.background}
          style={{ backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg')` }}
        ></div>
        <div className={styles.title}>
          <div className={styles.title__header}>
            <span>{championDetails?.name}</span>
          </div>
          <div className={styles['video__title--footer']}>
            <img src='https://universe.leagueoflegends.com/images/t1HeaderDivider.png' alt='-' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Champion;
