import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useFetchData } from '../../../global/utils';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';

import styles from './arsenal.module.scss';

const Arsenal = () => {
  const { t, i18n } = useTranslation();

  const { data } = useFetchData('valo-arsenal');

  const dataWeaponList = data?.data.reduce((acc: any, curr: any) => {
    const { shopData, weapons } = curr;

    if (!!shopData?.categoryText) acc[shopData?.categoryText] = weapons;
    return acc;
  }, {});

  const weaponsList = [t('allWeapons'), ...Object.keys(dataWeaponList || []), t('melee')];

  useEffect(() => {
    document.title = t('pageValoArsenal');
    document.documentElement.lang = i18n.language.slice(0, 2);
  }, [t, i18n]);

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
              <CustomSelect items={weaponsList} />
            </div>
          </div>
        </div>
        <div className={styles['wrapper__content--cards']}>Cards</div>
      </div>
    </div>
  );
};

export default Arsenal;
