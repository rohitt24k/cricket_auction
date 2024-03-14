import styles from "./background.module.css";

const Background = () => {
  return (
    <div className={styles.background}>
      <div className={styles["overlap_group"]}>
        <img
          className={styles["cricket_man"]}
          alt="Cricket man"
          src="cricket_man.svg"
        />
      </div>
    </div>
  );
};

export default Background;
