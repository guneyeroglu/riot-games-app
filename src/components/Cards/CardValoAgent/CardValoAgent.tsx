import { useState } from 'react';
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
      }
    ];
  };
}

const CardValoAgent = (props: IProps) => {
  const { data: agent } = props;

  const [abilityId, setAbilityId] = useState<number>(-1);

  const handleAbility = (id: number) => {
    if (abilityId === id || id === -1) {
      return setAbilityId(-1);
    }

    return setAbilityId(id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__item} onMouseLeave={() => handleAbility(-1)}>
        <div className={styles.image}>
          <img src={agent.fullPortrait} alt={agent.displayName} />
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
        <div
          className={styles.abilities}
          style={{ backgroundImage: `url('${agent.background}')` }}
        >
          <div className={styles.abilities__list}>
            {agent.abilities
              .filter((ability) => ability.slot !== 'Passive')
              .map((ability) => (
                <div
                  className={
                    agent.abilities.indexOf(ability) === abilityId
                      ? `${styles['abilities__list--item']} ${styles.active}`
                      : styles['abilities__list--item']
                  }
                  onClick={() =>
                    handleAbility(agent.abilities.indexOf(ability))
                  }
                  key={ability.displayName}
                  id={`ability-${agent.abilities.indexOf(ability)}`}
                >
                  <img src={ability.displayIcon} alt={ability.displayName} />
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
              <h4>- {agent.abilities[abilityId].displayName} -</h4>
              <span>{agent.abilities[abilityId].description}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardValoAgent;
