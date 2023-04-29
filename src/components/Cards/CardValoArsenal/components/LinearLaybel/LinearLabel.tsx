import styles from './linear-label.module.scss';

interface IProps {
  text: string;
  value: number;
  max?: number;
}

const LinearLabel = (props: IProps) => {
  const { text, value, max } = props;

  const currentValue = value ? Number(value.toFixed(0)) : 0;
  const maxValue = max || 255;
  const widthStyle = `${(100 * (currentValue / maxValue)).toFixed(0)}%`;

  const handleValue = (value: number) => {
    switch (true) {
      case value >= 0 && value <= 50:
        return styles.low;
      case value >= 51 && value <= 100:
        return styles.modarate;
      case value >= 101 && value <= 149:
        return styles.high;
      case value >= 150:
        return styles.fatal;
      default:
        return styles.low;
    }
  };

  return (
    <div className={styles.wrapper}>
      <p>{text}</p>
      <div className={styles.wrapper__linear}>
        <div className={`${styles.progress} ${handleValue(currentValue)}`} style={{ width: widthStyle }}></div>
        <span>{currentValue}</span>
      </div>
    </div>
  );
};

export default LinearLabel;
