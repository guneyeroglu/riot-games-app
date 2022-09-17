import { Dispatch, useState } from 'react';

import { Icon } from '../Icons/Icon';

import { useTranslation } from 'react-i18next';

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

  const [open, setOpen] = useState<boolean>(false);

  const { data, inputValue, filterValue, onSetFilterValue } = props;

  const roleList = data?.data
    .filter((agent: IAgent) => agent.displayName && agent.isPlayableCharacter)
    .reduce((agents: any, agent: IAgent) => {
      agents[agent?.role?.displayName] = agent?.role?.displayIcon;
      return agents;
    }, {});

  const handleVisibleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleSelectedListItem = (roleName: string) => {
    onSetFilterValue(roleName);
  };

  const menuClassList = open
    ? `${styles.wrapper__menu} ${styles.visible}`
    : styles.wrapper__menu;

  const buttonClassList = open
    ? `${styles.wrapper__button} ${styles.open}`
    : styles.wrapper__button;

  return (
    <div className={styles.wrapper}>
      <div className={buttonClassList} onClick={handleVisibleMenu}>
        <div className={styles['wrapper__button--icon']}>
          <Icon name='FilterIcon' />
        </div>
        <div className={styles['wrapper__button--text']}>
          <span>{t('filterAgent')}</span>
        </div>
      </div>
      <div className={menuClassList}>
        <h3>{t('agentsRole')}</h3>
        <ul id='roles'>
          <li
            className={
              data?.data.filter((agent) =>
                agent.displayName.toUpperCase().includes(inputValue)
              ).length === 0
                ? styles.deactivate
                : filterValue === ''
                ? styles.selected
                : ''
            }
            onClick={() => handleSelectedListItem('')}
          >
            <Icon name='TargetIcon' />
            <span>{t('all')}</span>
            <span>
              (
              {
                data?.data.filter(
                  (agent) =>
                    agent.displayName.toUpperCase().includes(inputValue) &&
                    agent.isPlayableCharacter
                ).length
              }
              )
            </span>
          </li>
          {roleList &&
            Object.keys(roleList).map((roleName: string) => (
              <li
                key={roleName}
                onClick={() => handleSelectedListItem(roleName)}
                className={
                  data?.data
                    .filter((agent) =>
                      agent.displayName.toUpperCase().includes(inputValue)
                    )
                    .filter((agent) => agent?.role?.displayName === roleName)
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
                      .filter((agent) =>
                        agent.displayName.toUpperCase().includes(inputValue)
                      )
                      .filter((agent) => agent?.role?.displayName === roleName)
                      .length
                  }
                  )
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
