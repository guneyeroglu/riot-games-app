import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { IWeapon } from '../../global/interfaces';

import styles from './custom-select.module.scss';

interface IProps {
  items: IWeapon[];
  currentWeapon: string;
  onSetCurrentWeapon: (value: string) => void;
}

const CustomSelect = (props: IProps) => {
  const { items, currentWeapon, onSetCurrentWeapon } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    onSetCurrentWeapon(event.target.value);
  };

  return (
    <div key={t('allWeapons')} className={styles.wrapper}>
      <Select
        defaultValue={''}
        value={currentWeapon || ''}
        onChange={handleChange}
        className={`${styles.wrapper__content} ${open ? styles.open : ''}`}
        MenuProps={{ className: styles.menu }}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;
