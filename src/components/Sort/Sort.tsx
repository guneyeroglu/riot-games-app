import { useState, Dispatch } from 'react';

import { Icon } from '../Icons/Icon';

import { useTranslation } from 'react-i18next';

import styles from './sort.module.scss';

type orderType = 'a-z' | 'z-a' | 'newest';

interface IProps {
  type: string;
  onSetType: Dispatch<orderType>;
}

const Sort = (props: IProps) => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState<boolean>(false);

  const { type, onSetType } = props;

  const handleVisible = () => {
    setVisible((prevValue: boolean) => !prevValue);
  };

  const style = visible
    ? `${styles.container} ${styles.open}`
    : styles.container;

  const classList = visible
    ? `${styles['container__sort--menu']} ${styles.visible}`
    : styles['container__sort--menu'];

  return (
    <button className={style} onClick={handleVisible}>
      <div className={styles.container__sort}>
        <Icon name='SortIcon' color='#937341' />
        <div className={styles['container__sort--title']}>
          <span>{t('sorting')}:</span>
          <span>{t(type)}</span>
        </div>
      </div>
      <div className={classList}>
        <ul>
          <li onClick={() => onSetType('a-z')}>
            <span>A-Z</span>
          </li>
          <li onClick={() => onSetType('z-a')}>
            <span>Z-A</span>
          </li>
          <li onClick={() => onSetType('newest')}>
            <span>{t('newest')}</span>
          </li>
        </ul>
      </div>
    </button>
  );
};

export default Sort;
