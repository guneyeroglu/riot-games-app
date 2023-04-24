import { useTranslation } from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import styles from './custom-select.module.scss';

interface IProps {
  items: string[];
}

const CustomSelect = (props: IProps) => {
  const { items } = props;
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value as string);
  };

  return (
    <div key={t('allWeapons')} className={styles.wrapper}>
      <Select defaultValue={t('allWeapons')} onChange={handleChange} className={styles.wrapper__content} MenuProps={{ className: styles.menu }}>
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;
