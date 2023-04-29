import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import { CardValoArsenal } from '../../../components/Cards';
import { v4 as uuidv4 } from 'uuid';

import { useFetchData } from '../../../global/utils';

import { IArsenalDetails, IWeapon } from '../../../global/interfaces';

import styles from './arsenal.module.scss';

const Arsenal = () => {
  const { t, i18n } = useTranslation();

  const { data, refetch } = useFetchData('valo-arsenal');
  const [currentWeapon, setCurrentWeapon] = useState<string>(`Weapon 1`);

  const dataWeaponList = data?.data.reduce((acc: any, curr: any) => {
    const { shopData } = curr;
    if (!!shopData?.categoryText) acc[shopData?.categoryText] = '';

    return acc;
  }, {});

  const handleWeaposList = () => {
    const arr: IWeapon[] = [];
    arr[0] = { id: uuidv4(), text: t('allWeapons'), value: `Weapon 1` };
    Object.keys(dataWeaponList || []).map((item, idx) => arr.push({ id: uuidv4(), text: item, value: `Weapon ${idx + 2}` }));
    arr[arr.length] = { id: uuidv4(), text: t('melee'), value: `Weapon ${arr.length + 1}` };
    return arr;
  };

  const weaponsList = handleWeaposList();

  useEffect(() => {
    document.title = t('pageValoArsenal');
    document.documentElement.lang = i18n.language.slice(0, 2);

    refetch();
  }, [t, i18n, refetch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__content}>
        <div className={styles['wrapper__content--head']}>
          <div className={styles.title}>
            <span>{t('chooseYourWeapon')}</span>
          </div>
          <div className={styles.navigate}>
            <div className={styles.navigate__text}>
              <span>{t('volarantProtocol')}</span>
              <span>MR0C - SWD - BR4</span>
            </div>
            <div className={styles.navigate__button}>
              <CustomSelect items={weaponsList} currentWeapon={currentWeapon} onSetCurrentWeapon={setCurrentWeapon} />
            </div>
          </div>
        </div>
        <div className={styles['wrapper__content--cards']}>
          {data?.data
            .filter((item: IArsenalDetails) => {
              const weapon = weaponsList.find((item) => item.value === currentWeapon)?.text;
              if (weapon === t('allWeapons')) return true;
              if (weapon === t('melee')) return !item.shopData;
              return item.shopData?.categoryText === weapon;
            })
            .map((item: IArsenalDetails) => (
              <CardValoArsenal key={item.uuid} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Arsenal;
