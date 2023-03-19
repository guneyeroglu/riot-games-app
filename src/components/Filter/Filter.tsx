import { Dispatch, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popover } from '@mui/material';

import { Icon } from '../Icons/Icon';

import styles from './filter.module.scss';

interface IAgent {
  uuid: string;
  displayName: string;
  description: string;
  fullPortrait: string;
  background: string;
  role: {
    uuid: string;
    displayName: string;
    description: string;
    displayIcon: string;
  };
  abilities: {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string;
  };
  isPlayableCharacter: boolean;
}

interface IProps {
  data: { data: IAgent[] };
  inputValue: string;
  filterValue: string;
  onSetFilterValue: Dispatch<string>;
}

const Filter = (props: IProps) => {
  const { t } = useTranslation();
  const [roleNumber, setRoleNumber] = useState<number>(-1);
  const { data, inputValue, filterValue, onSetFilterValue } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const roleList = data?.data
    .filter((agent: IAgent) => agent.displayName && agent.isPlayableCharacter)
    .reduce((agents: any, agent: IAgent) => {
      agents[agent?.role?.displayName] = agent?.role?.displayIcon;
      return agents;
    }, {});

  const handleSelectedListItem = (number: number) => {
    setRoleNumber(number);
    if (number >= 0) {
      return onSetFilterValue(Object.keys(roleList)[number]);
    }

    return onSetFilterValue('');
  };

  useEffect(() => {
    if (roleNumber >= 0) {
      onSetFilterValue(Object.keys(roleList)[roleNumber]);
    }
  }, [onSetFilterValue, roleList, roleNumber]);

  return (
    <div className={styles.wrapper}>
      <button className={`${styles.wrapper__button} ${open ? styles.open : ''}`.trim()} onClick={handleClick}>
        <div className={styles['wrapper__button--icon']}>
          <Icon name='FilterIcon' />
        </div>
        <div className={styles['wrapper__button--text']}>
          <span>{t('filterAgent')}</span>
        </div>
      </button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className={styles.popover}
      >
        <div className={styles.menu}>
          <h3>{t('agentsRole')}</h3>
          <ul id='roles'>
            <li
              className={
                data?.data.filter((agent) => agent.displayName.toUpperCase().includes(inputValue)).length === 0
                  ? styles.deactivate
                  : filterValue === ''
                  ? styles.selected
                  : ''
              }
              onClick={() => handleSelectedListItem(-1)}
            >
              <Icon name='TargetIcon' />
              <span>{t('all')}</span>
              <span>({data?.data.filter((agent) => agent.displayName.toUpperCase().includes(inputValue) && agent.isPlayableCharacter).length})</span>
            </li>
            {roleList &&
              Object.keys(roleList).map((roleName: string) => (
                <li
                  key={roleName}
                  onClick={() => handleSelectedListItem(Object.keys(roleList).indexOf(roleName))}
                  className={
                    data?.data.filter((agent) => agent.displayName.toUpperCase().includes(inputValue)).filter((agent) => agent?.role?.displayName === roleName)
                      .length === 0
                      ? styles.deactivate
                      : filterValue === roleName
                      ? styles.selected
                      : ''
                  }
                >
                  <img src={roleList[roleName]} alt={roleName} />
                  <span>{roleName}</span>
                  <span>
                    (
                    {
                      data?.data
                        .filter((agent) => agent.displayName.toUpperCase().includes(inputValue))
                        .filter((agent) => agent?.role?.displayName === roleName).length
                    }
                    )
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </Popover>
    </div>
  );
};

export default Filter;
