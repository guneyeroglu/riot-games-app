import { CircularProgress } from '@mui/material';

import styles from './spinner.module.scss';

interface IProps {
  color?: string;
}

const Spinner = (props: IProps) => {
  const { color } = props;

  const sx = color ? { sx: { color: `${color} !important` } } : {};

  return (
    <div className={styles.wrapper}>
      <CircularProgress color='error' {...sx} />
    </div>
  );
};

export default Spinner;
