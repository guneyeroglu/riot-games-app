import { Dispatch, useEffect, useState } from 'react';

import { Dialog } from '@mui/material';

import { Icon } from '../../Icons/Icon';
import Spinner from '../../Spinner/Spinner';

import useFetchData from '../../../global/hooks/useFetchData';

import { useTranslation } from 'react-i18next';

import styles from './dialog-lol-champion.module.scss';
import IconButton from '../../IconButton/IconButton';

interface IProps {
  open: boolean;
  onSetOpen: Dispatch<boolean>;
  championName: string;
}

interface ISkin {
  imageUrl: string;
  name: string;
}

interface ISkill {
  url: string;
  name: string;
  description: string;
}

interface IChampionDetails {
  champion_blurb: string;
  lore: string;
  champion_passive: {
    champion_passive_description: string;
    champion_passive_icon: string;
    champion_passive_name: string;
  };
  champion_q: {
    champion_q_description: string;
    champion_q_icon: string;
    champion_q_name: string;
  };
  champion_w: {
    champion_w_description: string;
    champion_w_icon: string;
    champion_w_name: string;
  };
  champion_e: {
    champion_e_description: string;
    champion_e_icon: string;
    champion_e_name: string;
  };
  champion_r: {
    champion_r_description: string;
    champion_r_icon: string;
    champion_r_name: string;
  };
  champion_name: string;
  champion_title: string;
  skins: ISkin[];
}

const DialogLolChampion = (props: IProps) => {
  const { open, onSetOpen, championName } = props;

  const [skinId, setSkinId] = useState<number>(0);
  const [width, setWidth] = useState<string>('0%');
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const [skillWidth, setSkillWidth] = useState<string>('0%');
  const [skillOnLoad, setSkillOnLoad] = useState<boolean>(false);
  const [lore, setLore] = useState<boolean>(false);
  const [skillName, setSkillName] = useState<string>('');
  const [imageOpen, setImageOpen] = useState<boolean>(false);

  const { t, i18n } = useTranslation();

  const handleClose = () => {
    onSetOpen(false);
    setSkillName('');
    setWidth('0%');
    setSkillWidth('0%');
    setOnLoad(false);
    setSkillOnLoad(false);
    setSkinId(0);
    setLore(false);
  };

  const { data: urlData } = useFetchData('lol-champion-url');

  const url = urlData?.result?.data?.allChampions?.edges?.filter(
    (champ: { node: { champion_name: string } }) =>
      champ.node.champion_name.toLowerCase() === championName.toLowerCase()
  )[0].node.url;

  const { data, isFetching, refetch } = useFetchData(
    'lol-champion-detail',
    url ?? '/champions/ahri/'
  );

  useEffect(() => {
    refetch();
  }, [refetch, championName, i18n.language]);

  const championDetails: IChampionDetails = data?.result?.data?.all?.nodes[0];

  const skills: ISkill[] = [
    {
      url: championDetails?.champion_passive.champion_passive_icon,
      name: championDetails?.champion_passive.champion_passive_name,
      description:
        championDetails?.champion_passive.champion_passive_description,
    },
    {
      url: championDetails?.champion_q.champion_q_icon,
      name: championDetails?.champion_q.champion_q_name,
      description: championDetails?.champion_q.champion_q_description,
    },
    {
      url: championDetails?.champion_w.champion_w_icon,
      name: championDetails?.champion_w.champion_w_name,
      description: championDetails?.champion_w.champion_w_description,
    },
    {
      url: championDetails?.champion_e.champion_e_icon,
      name: championDetails?.champion_e.champion_e_name,
      description: championDetails?.champion_e.champion_e_description,
    },
    {
      url: championDetails?.champion_r.champion_r_icon,
      name: championDetails?.champion_r.champion_r_name,
      description: championDetails?.champion_r.champion_r_description,
    },
  ];

  const skinQuantity = championDetails?.skins.length;

  const handleNextSkin = () => {
    setWidth('0%');
    setOnLoad(false);

    if (skinId === skinQuantity - 1) {
      return setSkinId(0);
    }

    return setSkinId((preValue) => preValue + 1);
  };

  const handlePreviousSkin = () => {
    setWidth('0%');
    setOnLoad(false);

    if (skinId === 0) {
      return setSkinId(skinQuantity - 1);
    }

    return setSkinId((preValue) => preValue - 1);
  };

  const handleImageOnLoad = () => {
    setWidth('100%');
    setOnLoad(true);
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

  const handleSkillDescriptionClose = () => {
    setSkillName('');
  };

  const handleImageModalOpen = () => {
    setImageOpen(true);
  };

  const handleImageModalClose = () => {
    setImageOpen(false);
  };

  return (
    <Dialog
      open={open}
      maxWidth='md'
      fullWidth
      onClose={handleClose}
      className={
        skillName === ''
          ? styles.container
          : `${styles.container} ${styles.open}`
      }
    >
      <div className={styles.wrapper}>
        <div className={styles.wrapper__title}>
          <div className={styles['wrapper__title--button']}>
            <IconButton label='CloseIcon' onClick={handleClose} />
          </div>
          {isFetching && <Spinner color='#c4b998' />}
          <span>
            {!isFetching &&
              `${championDetails?.champion_name.toUpperCase()} - ${
                i18n.language === 'tr_TR'
                  ? championDetails?.champion_title.toLocaleUpperCase()
                  : championDetails?.champion_title.toUpperCase()
              }`}
          </span>
        </div>
        <div className={styles.wrapper__content}>
          <div className={styles['wrapper__content-img']}>
            <div
              className={styles.image}
              style={{ pointerEvents: onLoad ? 'auto' : 'none' }}
              onClick={handleImageModalOpen}
            >
              {!onLoad && <Spinner color='#111111' />}
              {!isFetching && (
                <img
                  src={championDetails?.skins[skinId].imageUrl}
                  alt={championDetails?.skins[skinId].name}
                  width={width}
                  onLoad={handleImageOnLoad}
                />
              )}
            </div>
            <div className={styles.buttons}>
              <button onClick={handlePreviousSkin}>
                <Icon name='ArrowIcon' />
              </button>
              <button onClick={handleNextSkin}>
                <Icon name='ArrowIcon' />
              </button>
            </div>
          </div>
          <div className={styles['wrapper__content-info']}>
            <div className={styles.description}>
              {isFetching && <Spinner />}
              {!isFetching && !lore && (
                <span>
                  {championDetails?.champion_blurb}
                  <button onClick={() => setLore(true)}>{t('seeMore')}</button>
                </span>
              )}
              {!isFetching && lore && <span>{championDetails?.lore}</span>}
            </div>
            <div className={styles.skill}>
              {skills.map((skill) => (
                <div
                  key={skill.name + skill.description + skill.url}
                  className={
                    skillName === skill.name
                      ? `${styles.skill__item} ${styles.active}`
                      : styles.skill__item
                  }
                  style={{ pointerEvents: skillOnLoad ? 'auto' : 'none' }}
                  onClick={() => handleSelectedSkill(skill.name)}
                >
                  {!skillOnLoad && <Spinner color='#111111' />}
                  {!isFetching && (
                    <img
                      src={skill.url}
                      alt={skill.name}
                      width={skillWidth}
                      onLoad={handleSkillOnLoad}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.wrapper__drawer}>
          {skillName && (
            <>
              <div className={styles['wrapper__drawer--title']}>
                <span>- {skillName} -</span>
                <div className={styles.button}>
                  <IconButton
                    label='CloseIcon'
                    onClick={handleSkillDescriptionClose}
                  />
                </div>
              </div>
              <div className={styles['wrapper__drawer--content']}>
                <span>
                  {
                    skills.find((skill) => skill.name === skillName)
                      ?.description
                  }
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <Dialog
        open={imageOpen}
        maxWidth='lg'
        fullWidth
        onClose={handleImageModalClose}
        className={styles.big__image}
      >
        <div className={styles.dialog}>
          <div className={styles.dialog__title}>
            <div className={styles.button}>
              <IconButton label='CloseIcon' onClick={handleImageModalClose} />
            </div>
            <span>
              {championDetails?.skins[skinId].name === 'default'
                ? championDetails.champion_name.toUpperCase()
                : i18n.language === 'tr_TR'
                ? championDetails?.skins[skinId].name.toLocaleUpperCase()
                : championDetails?.skins[skinId].name.toUpperCase()}
            </span>
          </div>
          <div className={styles.dialog__content}>
            <img
              src={championDetails?.skins[skinId].imageUrl}
              alt={championDetails?.skins[skinId].name}
            />
          </div>
        </div>
      </Dialog>
    </Dialog>
  );
};

export default DialogLolChampion;
