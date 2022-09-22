import { CircularProgress } from '@mui/material';

import styles from './spinner.module.scss';

interface IProps {
  padding?: boolean;
}

const Spinner = (props: IProps) => {
  const padding = props.padding;
  const classList = padding
    ? `${styles.wrapper} ${styles.padding}`
    : styles.wrapper;

  return (
    <div className={classList}>
      <CircularProgress color='error' />
    </div>
  );
};

export default Spinner;
