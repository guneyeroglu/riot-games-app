import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFetchData } from '../../../global/utils';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import { CardValoArsenal } from '../../../components/Cards';

import { IArsenalDetails } from '../../../global/interfaces';

import styles from './arsenal.module.scss';

const Arsenal = () => {
  const { t, i18n } = useTranslation();

  const { data, refetch } = useFetchData('valo-arsenal');
  const [currentWeapon, setCurrentWeapon] = useState<string>(t('allWeapons'));

  const dataWeaponList = data?.data.reduce((acc: any, curr: any) => {
    const { shopData, weapons } = curr;

    if (!!shopData?.categoryText) acc[shopData?.categoryText] = weapons;
    return acc;
  }, {});

  const weaponsList = [t('allWeapons'), ...Object.keys(dataWeaponList || []), t('melee')];

  useEffect(() => {
    document.title = t('pageValoArsenal');
    document.documentElement.lang = i18n.language.slice(0, 2);

    refetch();
  }, [t, i18n, refetch]);

  useEffect(() => {
    setCurrentWeapon(t('allWeapons'));
  }, [t]);

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
              if (currentWeapon === t('allWeapons')) return true;
              if (currentWeapon === t('melee')) return !item.shopData;
              return item.shopData?.categoryText === currentWeapon;
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
