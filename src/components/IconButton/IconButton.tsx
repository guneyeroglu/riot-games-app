import { Icon } from '../Icons/Icon';

import { iconName } from '../../global/types/';

import styles from './icon-button.module.scss';

interface IProps {
  label: iconName;
  onClick: () => void;
}

const IconButton = (props: IProps) => {
  const { label, onClick } = props;
  return (
    <button onClick={onClick} className={styles.wrapper}>
      <Icon name={label} />
    </button>
  );
};

export default IconButton;
