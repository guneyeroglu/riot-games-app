import { CircularProgress } from '@mui/material';

import styles from './spinner.module.scss';

interface IProps {
  padding?: boolean;
  color?: string;
}

const Spinner = (props: IProps) => {
  const { padding, color } = props;

  const classList = padding
    ? `${styles.wrapper} ${styles.padding}`
    : styles.wrapper;

  const sx = color ? { sx: { color: color } } : {};

  return (
    <div className={classList}>
      <CircularProgress color='error' {...sx} />
    </div>
  );
};

export default Spinner;
