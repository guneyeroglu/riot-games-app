import styles from './data-not-found.module.scss';

interface IProps {
  text: string;
}

const DataNotFound = (props: IProps) => {
  const { text } = props;

  return (
    <div className={styles.wrapper}>
      <span>{text}</span>
    </div>
  );
};

export default DataNotFound;
