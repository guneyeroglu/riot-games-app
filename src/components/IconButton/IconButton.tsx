import { Icon } from '../Icons/Icon';

import { iconName } from '../../global/types/';

import styles from './icon-button.module.scss';

interface IProps {
  label: iconName;
  onClick: () => void;
  open?: boolean;
}

const IconButton = (props: IProps) => {
  const { label, onClick, open } = props;
  return (
    <button onClick={onClick} className={`${styles.wrapper} ${open ? styles.open : ''}`.trim()}>
      <Icon name={label} />
    </button>
  );
};

export default IconButton;
