import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.ellipse} />
      <div className={styles["text-wrapper"]}>Points: 1,00,000</div>
      <div className={styles.div}>Auction LIVE</div>
      <div className={styles.rectangle} />
    </div>
  );
};

export default Header;
