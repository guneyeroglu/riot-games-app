import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { useFetchData } from '../../../../global/utils';

import { IChampionDetails } from '../../../../global/interfaces';

import styles from './champion.module.scss';
import { Link } from 'react-router-dom';
import Spinner from '../../../../components/Spinner/Spinner';

const Champion = () => {
  const { championName } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [currentImageNumber, setCurrentImageNumber] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [ability, setAbility] = useState<string>('P');
  const [key, setKey] = useState<string>('0000');
  const [skillWidth, setSkillWidth] = useState<string>('0%');
  const [skillName, setSkillName] = useState<string>('');
  const [skillOnLoad, setSkillOnLoad] = useState<boolean>(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  const { data, isFetching, refetch, isLoading, isError } = useFetchData('lol-champion-detail', championName, { enabled: true });
  const championDetails: IChampionDetails = data?.data?.[championName || ''];

  const handleChampionKey = () => {
    if (Number(championDetails?.key) < 10) return setKey(`000${championDetails.key}`);
    if (Number(championDetails?.key) < 100) return setKey(`00${championDetails.key}`);
    if (Number(championDetails?.key) < 1000) return setKey(`0${championDetails.key}`);
  };

  const handleSkillOnLoad = () => {
    setSkillWidth('100%');
    setSkillOnLoad(true);
  };

  const handleSelectedSkill = (name: string) => {
    if (skillName === name) {
      return setSkillName('');
    }

    return setSkillName(name);
  };

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

  useEffect(() => {
    handleChampionKey();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [championDetails]);

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
                <span>{i18n.language === 'tr_TR' ? championDetails?.title.toLocaleUpperCase('TR') : championDetails?.title.toLocaleUpperCase('en-US')}</span>
                <img src='https://universe.leagueoflegends.com/images/t1HeaderDivider.png' alt='-' />
                <fieldset>
                  <div className={styles.gradient}></div>
                  <legend style={{ marginLeft: `calc(50% - calc(${width}px / 2) - 2rem)` }}>
                    <span ref={spanRef}>{championDetails.name.toLocaleUpperCase('en-US')}</span>
                  </legend>
                  <div className={styles.champion}>
                    <div className={styles.champion__info}>
                      <div className={styles.content}>
                        <div className={styles.content__logo}>
                          <img src='https://universe.leagueoflegends.com/images/role_icon_fighter.png' alt='role-icon' />
                        </div>
                        <div className={styles.content__role}>
                          <span>{t('role').toUpperCase()}</span>
                          <span>{championDetails.tags[0].toLocaleUpperCase('en-US')}</span>
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
            {/* <div className={styles.skills}>
              <div className={styles.skills__title}>
                <span>{t('abilities').toLocaleUpperCase('en-US')}</span>
              </div>
              {!isFetching && !isLoading && championDetails && (
                <ul className={styles.skills__list}>
                  <li>
                    <div className={styles.skill}>
                      {championDetails &&
                        [championDetails?.passive, ...championDetails?.spells]?.map((skill) => (
                          <div
                            key={skill.name + skill.description}
                            className={skillName === skill.name ? `${styles.skill__item} ${styles.active}` : styles.skill__item}
                            style={{
                              pointerEvents: skillOnLoad ? 'auto' : 'none',
                              backgroundColor: skillOnLoad ? 'transparent' : '#eeeeee',
                            }}
                            onClick={() => handleSelectedSkill(skill.name)}
                          >
                            {!skillOnLoad && <Spinner color='#171717' />}
                            {!isFetching && (
                              <img
                                src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/${skill.image.group}/${skill.image.full}`}
                                alt={skill.name}
                                width={skillWidth}
                                onLoad={handleSkillOnLoad}
                              />
                            )}
                          </div>
                        ))}
                    </div>
                    <div className={styles.video}>
                      {key !== '0000' && (
                        <video autoPlay loop muted preload='auto' playsInline>
                          <source src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_${ability}1.webm`} type='video/webm' />
                          <source src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_${ability}1.mp4`} type='video/mp4' />
                        </video>
                      )}
                    </div>
                  </li>
                </ul>
              )}
            </div> */}
          </div>
          {/* <div className={styles.wrapper__box}>
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
          </div> */}
        </div>
      )}
    </>
  );
};

export default Champion;
