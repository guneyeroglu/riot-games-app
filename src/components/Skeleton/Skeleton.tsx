import { Skeleton as MuiSkeleton } from '@mui/material';

import styles from './skeleton.module.scss';

interface IProps {
  color?: string;
  width?: string;
  height?: string;
}

const Skeleton = (props: IProps) => {
  const { color, width, height } = props;

  const sxColor = color
    ? { backgroundColor: color }
    : { backgroundColor: '#ffffff' };
  const sxWidth = width ? { width: width } : { width: '100px' };
  const sxHeight = height ? { height: height } : { height: '20px' };

  const sx = { sx: { ...sxColor, ...sxWidth, ...sxHeight } };

  return (
    <div className={styles.wrapper}>
      <MuiSkeleton variant='text' {...sx} />
    </div>
  );
};

export default Skeleton;
