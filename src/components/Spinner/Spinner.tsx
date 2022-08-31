import { CircularProgress } from '@mui/material';

import styles from './spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <CircularProgress color='error' />
    </div>
  );
};

export default Spinner;
