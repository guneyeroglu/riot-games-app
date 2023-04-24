import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import Spinner from '../../../../components/Spinner/Spinner';
import { useFetchData } from '../../../../global/utils';

import { IChampionDetails } from '../../../../global/interfaces';

import styles from './champion.module.scss';

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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const abilitiesRef = useRef<HTMLDivElement>(null);
  const skinsRef = useRef<HTMLDivElement>(null);

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

  const handleScrollToAbilities = () => {
    abilitiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToSkins = () => {
    skinsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  enum ABILITY {
    'P' = 0,
    'Q' = 1,
    'W' = 2,
    'E' = 3,
    'R' = 4,
  }

  const handleAbilityChange = (idx: number) => {
    if (ability === ABILITY[idx]) return;

    setIsLoaded(false);
    setAbility(ABILITY[idx]);
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
                <span>{i18n.language === 'tr_TR' ? championDetails?.title : championDetails?.title.toLocaleUpperCase('en-US')}</span>
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
                          <h5>{t('role').toUpperCase()}</h5>
                          <span>{championDetails.tags[0].toLocaleUpperCase('en-US')}</span>
                        </div>
                      </div>
                      <div className={styles.content}>
                        <button className={styles.content__role} onClick={handleScrollToAbilities}>
                          <span>{t('abilities').toUpperCase()}</span>
                        </button>
                      </div>
                      <div className={styles.content}>
                        <button className={styles.content__role} onClick={handleScrollToSkins}>
                          <span>{t('skins').toUpperCase()}</span>
                        </button>
                      </div>
                    </div>
                    <div className={styles.champion__lore}>
                      <span>{championDetails.lore}</span>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className={styles.abilities}>
              <div className={styles.abilities__title}>
                <span>{t('abilities').toLocaleUpperCase('en-US')}</span>
                <div className={styles.scroll} ref={abilitiesRef}></div>
              </div>
              {!isFetching && !isLoading && championDetails && (
                <div className={styles.abilities__info}>
                  <div className={styles.content}>
                    <ul>
                      {championDetails &&
                        [championDetails?.passive, ...championDetails?.spells]?.map((skill, idx) => (
                          <li key={skill.name + skill.description} className={ability === ABILITY[idx] ? styles.selected : ''}>
                            <button className={styles.ability} onClick={() => handleAbilityChange(idx)}>
                              <div
                                className={styles.image}
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
                                    height={skillWidth}
                                    onLoad={handleSkillOnLoad}
                                  />
                                )}
                              </div>
                            </button>
                          </li>
                        ))}
                    </ul>
                    <div className={styles.video}>
                      {key !== '0000' && (
                        <video
                          autoPlay
                          loop
                          muted
                          preload='auto'
                          playsInline
                          key={ability}
                          onLoadedData={() => setIsLoaded(true)}
                          className={!isLoaded ? styles.loading : ''}
                        >
                          <source src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_${ability}1.webm`} type='video/webm' />
                          <source src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_${ability}1.mp4`} type='video/mp4' />
                        </video>
                      )}
                      {!isLoaded && <Spinner color='#eeeeee' />}
                    </div>
                  </div>
                  {championDetails &&
                    [championDetails?.passive, ...championDetails?.spells]
                      .filter((_skill, idx) => idx === ABILITY[ability as keyof typeof ABILITY])
                      .map((skill) => (
                        <div key={skill.name + skill.description} className={styles.description}>
                          <h6>{ability === 'P' ? t('passive') : ability}</h6>
                          <h5>{skill.name}</h5>
                          <p>{skill.description.replace(/<\/?[^>]+(>|$)/g, ' ')}</p>
                        </div>
                      ))}
                </div>
              )}
            </div>
            <div className={styles.skins}>
              <div className={styles.skins__title}>
                <span>{t('skins').toLocaleUpperCase('en-US')}</span>
                <div className={styles.scroll} ref={skinsRef}></div>
              </div>
              <div className={styles.skins__image}>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${currentImageNumber}.jpg`}
                  alt={`${championName} - ${currentImageNumber}`}
                  key={currentImageNumber}
                />
              </div>
              <ul className={styles.list}>
                {championDetails &&
                  championDetails.skins.map((skin) => (
                    <li key={skin.id + skin.name + skin.num}>
                      <button onClick={() => setCurrentImageNumber(skin.num)} className={skin.num === currentImageNumber ? styles.active : ''}>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${skin.num}.jpg`} alt={skin.name} />
                        <span>{skin.name === 'default' ? championName : skin.name}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Champion;
