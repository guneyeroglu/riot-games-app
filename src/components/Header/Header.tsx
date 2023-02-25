import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Dropdown from '../Dropdown/Dropdown';
import { Icon } from '../Icons/Icon';

import styles from './header.module.scss';

interface INavItem {
  id: number;
  name: string;
  onClick: () => any;
}

interface ICountry {
  id: number;
  name: JSX.Element;
  onClick: () => any;
  selected: boolean;
}

const Header = () => {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const handleNavigate = (pathname: string) => {
    navigate(pathname);
  };

  const lolNavItems: INavItem[] = [
    { id: 1, name: t('champions'), onClick: () => handleNavigate('/leagueoflegends/champions') },
    { id: 2, name: t('regions'), onClick: () => handleNavigate('/leagueoflegends/regions') },
    { id: 3, name: t('items'), onClick: () => handleNavigate('/leagueoflegends/items') },
  ];

  const valoNavItems: INavItem[] = [
    { id: 1, name: t('agents'), onClick: () => handleNavigate('/valorant/agents') },
    { id: 2, name: t('maps'), onClick: () => handleNavigate('/valorant/maps') },
    { id: 3, name: t('arsenal'), onClick: () => handleNavigate('/valorant/arsenal') },
  ];

  const allNavItems: Array<INavItem[]> = [lolNavItems, valoNavItems];

  enum NavName {
    'League of Legends' = 0,
    'Valorant' = 1,
  }

  const listItems: INavItem[] = [
    { id: 1, name: 'League of Legends', onClick: () => handleNavigate('/leagueoflegends') },
    { id: 2, name: 'Valorant', onClick: () => handleNavigate('/valorant') },
  ];

  const countryList: ICountry[] = [
    {
      id: 1,
      name: <Icon name='GBIcon' vb='0 0 640 480' wh={24} />,
      onClick: () => handleChangeLanguage('en_US'),
      selected: 'en_US' === (localStorage.getItem('language') ?? 'en_US'),
    },
    {
      id: 2,
      name: <Icon name='TRIcon' vb='0 0 640 480' wh={24} />,
      onClick: () => handleChangeLanguage('tr_TR'),
      selected: 'tr_TR' === (localStorage.getItem('language') ?? 'tr_TR'),
    },
  ];

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <header className={styles.wrapper}>
      <nav className={styles.wrapper__nav}>
        <ul>
          <li>
            <Dropdown items={listItems} input={<Icon name='RiotGamesIcon' wh={85} hg={27} vb={'0 0 587.93 165'} />} pointer clickAway />
          </li>
          <li className={styles.home}>
            <Link to='/'>
              <Icon name='RiotFistIcon' vb='0 0 32 32' />
            </Link>
          </li>
          <li>
            {allNavItems.map((navItem, idx) => (
              <Dropdown key={idx} items={navItem} input={<span>{NavName[idx]}</span>} hover pointer clickAway />
            ))}
          </li>
        </ul>
      </nav>
      <div className={styles.wrapper__settings}>
        <Dropdown input={<Icon name='WorldIcon' wh={20} hg={20} />} items={countryList} pointer />
      </div>
    </header>
  );
};

export default Header;
