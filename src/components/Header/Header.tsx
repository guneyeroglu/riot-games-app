import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { useMediaQuery } from '@mui/material';

import DrawerHeader from '../Drawers/DrawerHeader/DrawerHeader';
import CustomMenu from '../CustomMenu/CustomMenu';
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
  const [open, setOpen] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

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
    { id: 1, name: NavName[0], onClick: () => handleNavigate('/leagueoflegends') },
    { id: 2, name: NavName[1], onClick: () => handleNavigate('/valorant') },
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
      selected: 'tr_TR' === localStorage.getItem('language'),
    },
  ];

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const isMobile = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }

    return () => {
      setOpen(false);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!localStorage.getItem('language')) localStorage.setItem('language', 'en_US');
  }, []);

  return (
    <header className={styles.wrapper}>
      <nav className={styles.wrapper__nav}>
        <ul>
          {isMobile && (
            <li>
              <button className={styles.hamburger} onClick={handleDrawerOpen}>
                <Icon name='RiotGamesIcon' wh={85} hg={27} vb={'0 0 587.93 165'} />
                <Icon name='MenuArrowIcon' />
              </button>
            </li>
          )}
          {!isMobile && (
            <li>
              <CustomMenu items={listItems} input={<Icon name='RiotGamesIcon' wh={85} hg={27} vb={'0 0 587.93 165'} />} pointer clickAway />
            </li>
          )}
          <li className={styles.home}>
            <a href='/' target='_self'>
              <Icon name='RiotFistIcon' vb='0 0 32 32' />
            </a>
          </li>
          {!isMobile && (
            <li>
              {allNavItems.map((navItem, idx) => (
                <CustomMenu key={idx} items={navItem} input={<span>{NavName[idx]}</span>} hover pointer clickAway />
              ))}
            </li>
          )}
        </ul>
      </nav>
      <div className={`${styles.wrapper__settings} ${isMobile ? styles.mobile : ''}`.trim()}>
        <CustomMenu items={countryList} input={<Icon name='WorldIcon' />} />
      </div>
      <DrawerHeader
        open={open}
        onClose={handleDrawerClose}
        contents={allNavItems.map((navItem, idx) => {
          return {
            title: {
              label: listItems[idx].name,
              onClick: () => {
                listItems[idx].onClick();
                setOpen(false);
              },
            },
            subtitles: navItem.map((item) => ({
              label: item.name,
              onClick: () => {
                item.onClick();
                setOpen(false);
              },
            })),
          };
        })}
      />
    </header>
  );
};

export default Header;
