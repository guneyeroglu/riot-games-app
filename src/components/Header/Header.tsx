import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'semantic-ui-react';

import { Icon } from '../Icons/Icon';
import { iconName } from '../../global/types/';

import styles from './header.module.scss';

interface INavItem {
  id: number;
  name: string;
  to: string;
}

interface IOpen {
  firstNav: boolean;
  secondNav: boolean;
  thirdNav: boolean;
}

interface ICountry {
  id: number;
  iconName: iconName;
  lang: string;
}

const Header = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<IOpen>({
    firstNav: false,
    secondNav: false,
    thirdNav: false,
  });

  const { t, i18n } = useTranslation();

  const lolNavItems: INavItem[] = [
    { id: 1, name: t('champions'), to: '/leagueoflegends/champions' },
    { id: 2, name: t('regions'), to: '/leagueoflegends/regions' },
    { id: 3, name: t('items'), to: '/leagueoflegends/items' },
  ];

  const valoNavItems: INavItem[] = [
    { id: 1, name: t('agents'), to: '/valorant/agents' },
    { id: 2, name: t('maps'), to: '/valorant/maps' },
    { id: 3, name: t('arsenal'), to: '/valorant/arsenal' },
  ];

  const allNavItems: Array<INavItem[]> = [lolNavItems, valoNavItems];

  const listItems: INavItem[] = [
    { id: 1, name: 'League of Legends', to: '/leagueoflegends' },
    { id: 2, name: 'Valorant', to: '/valorant' },
  ];

  const countryList: ICountry[] = [
    { id: 1, iconName: 'GBIcon', lang: 'en_US' },
    { id: 2, iconName: 'TRIcon', lang: 'tr_TR' },
  ];

  const handleNavigate = (pathname: string) => {
    navigate(pathname);
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleGamesClose = (id: number) => {
    if (id === 0) {
      return setIsOpen({ ...isOpen, secondNav: !isOpen.secondNav });
    } else if (id === 1) {
      return setIsOpen({ ...isOpen, thirdNav: !isOpen.thirdNav });
    }

    return null;
  };

  const dropdownStyle = isOpen.firstNav ? styles.open : '';
  const firstGameStyle = isOpen.secondNav ? `${styles.games} ${styles.active}` : styles.games;
  const secondGameStyle = isOpen.thirdNav ? `${styles.games} ${styles.active}` : styles.games;

  return (
    <header className={styles.wrapper}>
      <nav className={styles.wrapper__nav}>
        <ul>
          <li>
            <Dropdown
              className={dropdownStyle}
              pointing
              icon={
                <div className={styles.logo}>
                  <Icon name='RiotGamesIcon' wh={85} hg={27} vb={'0 0 587.93 165'} />
                  <i aria-hidden='true' className='dropdown icon'></i>
                </div>
              }
              onClick={() => setIsOpen({ ...isOpen, firstNav: !isOpen.firstNav })}
              onClose={() => setIsOpen({ ...isOpen, firstNav: false })}
            >
              <Dropdown.Menu as={'ul'}>
                {listItems.map((li: INavItem) => (
                  <Dropdown.Item as={'li'} key={li.id} onClick={() => handleNavigate(li.to)}>
                    <span>{li.name}</span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Link to='/'>
              <Icon name='RiotFistIcon' vb='0 0 32 32' />
            </Link>
          </li>
          {listItems.map((li: INavItem, idx: number) => (
            <li key={li.id}>
              <Dropdown
                text={li.name}
                pointing
                className={idx === 0 ? firstGameStyle : secondGameStyle}
                onClick={() => handleGamesClose(idx)}
                onClose={() =>
                  setIsOpen({
                    ...isOpen,
                    firstNav: false,
                    secondNav: false,
                    thirdNav: false,
                  })
                }
              >
                <Dropdown.Menu as={'ul'}>
                  {allNavItems[idx].map((nav: INavItem) => (
                    <Dropdown.Item as={'li'} key={nav.id} onClick={() => handleNavigate(nav.to)}>
                      <span>{nav.name}</span>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.wrapper__settings}>
        <Dropdown icon={<Icon name='WorldIcon' wh={20} hg={20} />} pointing item className={styles.language}>
          <Dropdown.Menu as={'ul'}>
            {countryList.map((ctry: ICountry) => (
              <Dropdown.Item as={'li'} onClick={() => handleChangeLanguage(ctry.lang)} key={ctry.id}>
                <span className={ctry.lang === (localStorage.getItem('language') ?? 'en_US') ? styles.selected : ''}>
                  <Icon name={ctry.iconName} vb='0 0 640 480' wh={24} />
                </span>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
