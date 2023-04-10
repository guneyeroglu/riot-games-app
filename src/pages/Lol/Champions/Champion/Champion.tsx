import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { useFetchData } from '../../../../global/utils';

import { IChampionDetails } from '../../../../global/interfaces';

import styles from './champion.module.scss';
import { Link } from 'react-router-dom';

const Champion = () => {
  const { championName } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [currentImageNumber, setCurrentImageNumber] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const spanRef = useRef<HTMLSpanElement>(null);

  const { data, isFetching, refetch, isLoading, isError } = useFetchData('lol-champion-detail', championName, { enabled: true });
  const championDetails: IChampionDetails = data?.data?.[championName || ''];

  useEffect(() => {
    if (isError) {
      navigate('/leagueoflegends/champions');
    }
  }, [isError, navigate]);

  useEffect(() => {
    document.title = t('pageLolChampion', { word: championName });
    document.documentElement.lang = i18n.language.slice(0, 2);
    refetch();
  }, [championName, i18n.language, refetch, t]);

  useEffect(() => {
    if (spanRef) setWidth((preValue) => spanRef.current?.getBoundingClientRect().width || preValue);
  }, [spanRef, championDetails]);

  console.log(championDetails);

  return (
    <>
      {championDetails && (
        <div className={styles.wrapper}>
          <div
            className={styles.background}
            style={{ backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${currentImageNumber}.jpg')` }}
          ></div>
          <div className={styles.wrapper__content}>
            <div className={styles.title}>
              <div className={styles.title__header}>
                <span>{championDetails?.title.toUpperCase()}</span>
                <img src='https://universe.leagueoflegends.com/images/t1HeaderDivider.png' alt='-' />
                <fieldset>
                  <div className={styles.gradient}></div>
                  <legend style={{ marginLeft: `calc(50% - calc(${width}px / 2) - 2rem)` }}>
                    <span ref={spanRef}>{championDetails.name.toUpperCase()}</span>
                  </legend>
                  <div className={styles.champion}>
                    <div className={styles.champion__info}>
                      <div className={styles.content}>
                        <div className={styles.content__logo}>
                          <img src='https://universe.leagueoflegends.com/images/role_icon_fighter.png' alt='role-icon' />
                        </div>
                        <div className={styles.content__role}>
                          <span>{t('role').toUpperCase()}</span>
                          <span>{championDetails.tags[0].toUpperCase()}</span>
                        </div>
                      </div>
                      <div className={styles.content}>
                        <Link to={'#'} className={styles.content__role}>
                          <span>{t('skins').toUpperCase()}</span>
                        </Link>
                      </div>
                      <div className={styles.content}>
                        <Link to={'#'} className={styles.content__role}>
                          <span>{t('abilities').toUpperCase()}</span>
                        </Link>
                      </div>
                    </div>
                    <div className={styles.champion__lore}>
                      <span>{championDetails.lore}</span>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div className={styles.wrapper__box}>
            <div className={styles.gradient}></div>
            <div className={styles.first}>
              <div className={styles.first__skins}>
                {championDetails.skins.map((skin) => (
                  <button key={skin.name + skin.id} onClick={() => setCurrentImageNumber(skin.num)}>
                    <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${skin.num}.jpg`} alt={skin.name} />
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.middle}>
              <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${currentImageNumber}.jpg`} alt='-' />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Champion;
