import { Dispatch, useEffect, useState } from 'react';

import { Dialog } from '@mui/material';

import { Icon } from '../../Icons/Icon';
import IconButton from '../../IconButton/IconButton';
import Spinner from '../../Spinner/Spinner';

import useFetchData from '../../../global/hooks/useFetchData';

import { useTranslation } from 'react-i18next';

import styles from './dialog-lol-champion.module.scss';

interface IProps {
  open: boolean;
  onSetOpen: Dispatch<boolean>;
  championName: string;
}

interface IImage {
  full: string;
  group: string;
  h: number;
  sprite: string;
  w: number;
  x: number;
  y: number;
}

interface ISkill {
  description: string;
  image: IImage;
  name: string;
}

interface ISkin {
  id: string;
  name: string;
  num: number;
}

interface IChampionDetails {
  blurb: string;
  id: string;
  image: IImage;
  key: string;
  lore: string;
  name: string;
  passive: ISkill;
  skins: ISkin[];
  spells: ISkill[];
  title: string;
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

  const { data, isFetching, refetch } = useFetchData(
    'lol-champion-detail',
    championName,
    { enabled: false }
  );

  const championDetails: IChampionDetails = data?.data?.[championName];

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

  useEffect(() => {
    if (championName) {
      refetch();
    }
  }, [refetch, championName, i18n.language]);

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
              `${championDetails?.name.toUpperCase()} - ${
                i18n.language === 'tr_TR'
                  ? championDetails?.title.toLocaleUpperCase()
                  : championDetails?.title.toUpperCase()
              }`}
          </span>
        </div>
        <div className={styles.wrapper__content}>
          <div className={styles['wrapper__content-img']}>
            <div
              className={styles.image}
              style={{
                pointerEvents: onLoad ? 'auto' : 'none',
                backgroundColor: onLoad ? 'transparent' : '#ffffff',
              }}
              onClick={handleImageModalOpen}
            >
              {!onLoad && <Spinner color='#111111' />}
              {!isFetching && championDetails && (
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${championDetails?.skins[skinId].num}.jpg`}
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
                  {championDetails?.blurb}
                  <button onClick={() => setLore(true)}>{t('seeMore')}</button>
                </span>
              )}
              {!isFetching && lore && <span>{championDetails?.lore}</span>}
            </div>
            <div className={styles.skill}>
              {championDetails &&
                [championDetails?.passive, ...championDetails?.spells]?.map(
                  (skill) => (
                    <div
                      key={skill.name + skill.description}
                      className={
                        skillName === skill.name
                          ? `${styles.skill__item} ${styles.active}`
                          : styles.skill__item
                      }
                      style={{
                        pointerEvents: skillOnLoad ? 'auto' : 'none',
                        backgroundColor: skillOnLoad
                          ? 'transparent'
                          : '#ffffff',
                      }}
                      onClick={() => handleSelectedSkill(skill.name)}
                    >
                      {!skillOnLoad && <Spinner color='#111111' />}
                      {!isFetching && (
                        <img
                          src={`http://ddragon.leagueoflegends.com/cdn/12.21.1/img/${skill.image.group}/${skill.image.full}`}
                          alt={skill.name}
                          width={skillWidth}
                          onLoad={handleSkillOnLoad}
                        />
                      )}
                    </div>
                  )
                )}
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
                  {championDetails &&
                    [championDetails.passive, ...championDetails.spells]
                      .find((skill) => skill.name === skillName)
                      ?.description.replace(/<\/?[^>]+(>|$)/g, '')}
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
                ? championDetails.name.toUpperCase()
                : i18n.language === 'tr_TR'
                ? championDetails?.skins[skinId].name.toLocaleUpperCase()
                : championDetails?.skins[skinId].name.toUpperCase()}
            </span>
          </div>
          <div className={styles.dialog__content}>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${championDetails?.skins[skinId].num}.jpg`}
              alt={championDetails?.skins[skinId].name}
            />
          </div>
        </div>
      </Dialog>
    </Dialog>
  );
};

export default DialogLolChampion;
