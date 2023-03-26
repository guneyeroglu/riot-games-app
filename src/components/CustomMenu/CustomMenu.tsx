import { useRef, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

import { Icon } from '../Icons/Icon';

import styles from './custom-menu.module.scss';

interface IITems {
  id: number | string;
  name: string | JSX.Element;
  onClick?: () => any;
  selected?: boolean;
}

interface IProps {
  input: JSX.Element;
  items: IITems[];
  hover?: boolean;
  pointer?: boolean;
  className?: string;
  clickAway?: boolean;
}

const CustomMenu = (props: IProps) => {
  const { input, items, hover, pointer, clickAway, className } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={handleClick} className={open ? styles.open : ''} ref={buttonRef}>
        {!hover && (
          <>
            {input}
            {pointer && <Icon name='MenuArrowIcon' />}
          </>
        )}
        {!!hover && (
          <div className={`${styles.item} ${open ? styles.active : ''}`.trim()}>
            {input}
            {pointer && <Icon name='MenuArrowIcon' />}
          </div>
        )}
      </button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} className={`${styles.wrapper__list} ${className || ''}`.trim()}>
        {items.map((li) => (
          <MenuItem
            key={li.id}
            style={{ minWidth: buttonRef?.current?.clientWidth ? buttonRef?.current?.clientWidth - 6 : 'auto' }}
            onClick={() => {
              if (typeof li.onClick !== 'undefined') {
                li.onClick();
              }

              if (clickAway) {
                handleClose();
              }
            }}
            className={`${li.selected ? styles.selected : ''}`.trim()}
          >
            <span>{li.name}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CustomMenu;
