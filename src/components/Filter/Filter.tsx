import { Icon } from '../Icons/Icon';

import { useTranslation } from 'react-i18next';

import { useState } from 'react';

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
}

interface IProps {
  data: { data: IAgent[] };
  inputValue: string;
}

const Filter = (props: IProps) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  const { data, inputValue } = props;

  const roleList = data?.data.reduce((agents: any, agent: IAgent) => {
    agents[agent?.role?.displayName] = agent?.role?.displayIcon;
    return agents;
  }, {});

  const handleVisibleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleSelectedListItem = () => {
    //

    console.log('first');
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
        <ul>
          <div>
            <Icon name='TargetIcon' />
            <span>{t('all')}</span>
            <span>
              (
              {
                data?.data.filter((agent) =>
                  agent.displayName.toUpperCase().includes(inputValue)
                ).length
              }
              )
            </span>
          </div>
          {roleList &&
            Object.keys(roleList)
              .filter((role: string) => role !== 'undefined')
              .map((roleName: string) => (
                <div
                  key={roleName}
                  onClick={handleSelectedListItem}
                  aria-disabled='true'
                  aria-checked='true'
                  style={{ pointerEvents: 'none' }}
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
                        .filter(
                          (agent) => agent?.role?.displayName === roleName
                        ).length
                    }
                    )
                  </span>
                </div>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
