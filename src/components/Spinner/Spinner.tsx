import { CircularProgress } from '@mui/material';

import styles from './spinner.module.scss';

interface IProps {
  padding?: boolean;
  color?: string;
  center?: boolean;
}

const Spinner = (props: IProps) => {
  const { padding, color, center } = props;

  const classList = padding ? `${styles.wrapper} ${styles.padding}` : styles.wrapper;

  const sx = color ? { sx: { color: `${color} !important` } } : {};

  return (
    <div
      className={classList}
      style={
        center
          ? {
              position: 'absolute',
              top: '50%',
              transform: 'translate(0, -50%)',
            }
          : {}
      }
    >
      <CircularProgress color='error' {...sx} />
    </div>
  );
};

export default Spinner;
