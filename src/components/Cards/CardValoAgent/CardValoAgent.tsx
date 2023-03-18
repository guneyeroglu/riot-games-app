import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazy-load';

import Spinner from '../../Spinner/Spinner';

import styles from './card-valo-agent.module.scss';

type abilityName = 'Ability1' | 'Ability2' | 'Grenade' | 'Ultimate' | 'Passive';

interface IProps {
  data: {
    uuid: string;
    displayName: string;
    description: string;
    fullPortrait: string;
    background: string;
    role: { uuid: string; displayName: string; description: string };
    abilities: [
      {
        slot: abilityName;
        displayName: string;
        description: string;
        displayIcon: string;
      },
    ];
  };
}

const CardValoAgent = (props: IProps) => {
  const { data: agent } = props;

  const { i18n } = useTranslation();
  const [abilityId, setAbilityId] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const handleAbility = (id: number) => {
    if (abilityId === id || id === -1) {
      return setAbilityId(-1);
    }

    return setAbilityId(id);
  };

  const handleSpinner = () => {
    setIsLoading(false);
  };

  const handleHoverEffect = () => {
    if (!isMobile) return;

    setOpen(true);
  };

  return (
    <div className={styles.card}>
      <div className={`${styles.card__item} ${open ? styles.open : ''}`.trim()} onMouseLeave={() => handleAbility(-1)} onClick={handleHoverEffect}>
        <div className={styles.image}>
          {isLoading && <Spinner />}
          {
            <LazyLoad width={isLoading ? '0%' : '100%'} height={'100%'} offset={800}>
              <img src={agent.fullPortrait} alt={agent.displayName} onLoad={handleSpinner} />
            </LazyLoad>
          }
        </div>
        <div className={styles.info}>
          <div className={styles.info__title}>
            <span>{agent.displayName.toUpperCase()}</span>
          </div>
          <div className={styles.info__subtitle}>
            <span>{agent.role.displayName}</span>
          </div>
          <div className={styles.info__description}>
            <span>{agent.description}</span>
          </div>
        </div>
        <div className={styles.abilities} style={{ backgroundImage: `url('${agent.background}')` }}>
          <div className={styles.abilities__list}>
            {agent.abilities
              .filter((ability) => ability.slot !== 'Passive')
              .map((ability) => (
                <div
                  className={
                    agent.abilities.indexOf(ability) === abilityId ? `${styles['abilities__list--item']} ${styles.active}` : styles['abilities__list--item']
                  }
                  onClick={() => handleAbility(agent.abilities.indexOf(ability))}
                  key={ability.displayName}
                  id={`ability-${agent.abilities.indexOf(ability)}`}
                >
                  <LazyLoad width={'100%'} height={'100%'} offset={400}>
                    <img src={ability.displayIcon} alt={ability.displayName} />
                  </LazyLoad>
                  <span>
                    {ability.slot === 'Ability1' && 'Q'}
                    {ability.slot === 'Ability2' && 'E'}
                    {ability.slot === 'Grenade' && 'C'}
                    {ability.slot === 'Ultimate' && 'X'}
                  </span>
                </div>
              ))}
          </div>
          {abilityId !== -1 && (
            <div className={styles.abilities__description}>
              <h4>
                {`- ${
                  i18n.language === 'tr_TR' ? agent.abilities[abilityId].displayName.toLocaleUpperCase() : agent.abilities[abilityId].displayName.toUpperCase()
                } -`}
              </h4>
              <span>{agent.abilities[abilityId].description}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardValoAgent;
