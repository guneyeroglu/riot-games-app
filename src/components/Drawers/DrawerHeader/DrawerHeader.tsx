import { Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../Icons/Icon';

import { useTranslation } from 'react-i18next';

import styles from './drawer-header.module.scss';

interface IContent {
  title: { label: string; onClick: () => any };
  subtitles: { label: string; onClick: () => any }[];
}

interface IProps {
  open: boolean;
  onClose: () => any;
  contents: IContent[];
  className?: string;
  homeUrl?: string;
}

const DrawerHeader = (props: IProps) => {
  const { open, onClose, className, contents, homeUrl } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(homeUrl || '/');
    onClose();
  };

  return (
    <Drawer open={open} anchor='right' className={`${styles.wrapper} ${className || ''}`.trim()} onClose={onClose}>
      <div className={styles.wrapper__title}>
        <button onClick={onClose}>
          <Icon name='CloseIcon' />
        </button>
      </div>
      <div className={styles.wrapper__content}>
        {contents.map((content, idx) => (
          <div className={styles.box} key={content.title.label + idx}>
            <div className={styles.box__title} onClick={content.title.onClick}>
              <span>{content.title.label}</span>
              <Icon name='ArrowIcon' />
            </div>
            <ul className={styles.box__list}>
              {content.subtitles.map((subtitle, index) => (
                <li key={subtitle.label + index} onClick={subtitle.onClick}>
                  <span>{subtitle.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.wrapper__navigate}>
        <button onClick={handleClickNavigate}>
          <span>{t('home')}</span>
          <Icon name='RiotFistIcon' vb='0 0 32 32' />
        </button>
      </div>
    </Drawer>
  );
};

export default DrawerHeader;
