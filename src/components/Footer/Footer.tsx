import { Link, useLocation } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Divider } from 'semantic-ui-react';

import { Icon } from '../Icons/Icon';
import FooterItemTop from './FooterItemTop';

import { iconName } from '../../global/types/';

import styles from './footer.module.scss';

interface INavIcon {
  id: number;
  name: iconName;
  link: string;
}

const navIcons: INavIcon[] = [
  { id: 1, name: 'TwitterIcon', link: 'https://twitter.com/riotgames' },
  { id: 2, name: 'InstagramIcon', link: 'https://instagram.com/riotgames/' },
  { id: 3, name: 'FacebookIcon', link: 'https://facebook.com/RiotGames/' },
  { id: 4, name: 'YouTubeIcon', link: 'https://youtube.com/riotgames' },
];

const socialMediaIcon: INavIcon[] = [
  { id: 1, name: 'TwitterIcon', link: 'https://twitter.com/guneyeroglu_/' },
  { id: 2, name: 'InstagramIcon', link: 'https://instagram.com/guneyeroglu_/' },
  { id: 3, name: 'LinkedInIcon', link: 'https://linkedin.com/in/guneyeroglu/' },
  { id: 4, name: 'GitHubIcon', link: 'https://github.com/guneyeroglu' },
];

const Footer = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <footer className={styles.wrapper}>
      {pathname !== '/' && <FooterItemTop pathname={pathname} />}
      <div className={styles.wrapper__nav}>
        <div className={styles['wrapper__nav--icons']}>
          {navIcons.map((icon: INavIcon) => (
            <a key={icon.id} href={icon.link} target='_blank' rel='noreferrer'>
              <Icon name={icon.name} />
            </a>
          ))}
        </div>
      </div>
      <div className={styles.wrapper__logo}>
        <Link to='/'>
          <Icon name='RiotGamesIcon' vb={'0 0 587.93 165'} />
        </Link>
      </div>
      <div className={styles.wrapper__copyright}>
        <span>{t('copyrightRiot')}</span>
      </div>
      <div className={styles.wrapper__divider}>
        <Divider inverted horizontal>
          {t('socialMedia')}
        </Divider>
      </div>
      <div className={styles.wrapper__media}>
        <div className={styles['wrapper__media--icons']}>
          {socialMediaIcon.map((icon: INavIcon) => (
            <a key={icon.id} href={icon.link} target='_blank' rel='noreferrer'>
              <Icon name={icon.name} />
            </a>
          ))}
        </div>
      </div>
      <div className={styles.wrapper__info}>
        <p>
          <Trans
            defaults='developedByWho'
            values={{ word: 'G??ney Ero??lu' }}
            components={{
              span: <span />,
              a: (
                <a href='https://www.linkedin.com/in/guneyeroglu/' target='_blank' rel='noreferrer'>
                  {null}
                </a>
              ),
            }}
          />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
