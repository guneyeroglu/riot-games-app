import styles from './divider.module.scss';

interface IProps {
  text?: string;
}
const Divider = (props: IProps) => {
  const { text } = props;
  return (
    <>
      {text && (
        <div className={styles.wrapper}>
          <div className={styles.border}></div>
          <span>{text}</span>
          <div className={styles.border}></div>
        </div>
      )}
      {!text && <div className={styles.border}></div>}
    </>
  );
};

export default Divider;
