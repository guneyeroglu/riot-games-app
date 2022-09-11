import styles from './card-valo-agent.module.scss';

interface IProps {
  data: {
    uuid: string;
    displayName: string;
    description: string;
    fullPortrait: string;
    background: string;
    role: { uuid: string; displayName: string; description: string };
    abilities: {
      slot: string;
      displayName: string;
      description: string;
      displayIcon: string;
    };
  };
}

const CardValoAgent = (props: IProps) => {
  const { data: agent } = props;
  return (
    <div className={styles.card}>
      <div className={styles.card__item}>
        <div className={styles.image}>
          <img src={agent.fullPortrait} alt={agent.displayName} />
        </div>
        <div className={styles.info}>
          <div className={styles.info__title}>
            <span>{agent.displayName}</span>
          </div>
          <div className={styles.info__subtitle}>
            <span>{agent.role.displayName}</span>
          </div>
          <div className={styles.info__description}>
            <span>{agent.description}</span>
          </div>
        </div>
        <div className={styles.abilities}></div>
      </div>
    </div>
  );
};

export default CardValoAgent;
